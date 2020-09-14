const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

writeStream.write(`Title, Link, Date \n`);

request('https://www.detik.com/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.media__text').each((i, el) => {
            const title = $(el).find('.media__title a').text().replace(/\s\s+/g, '');

            const link = $(el).find('a').attr('href');

            const date = $(el).find('.media__date span').text().replace(/,/, '');

            //write to csv
            writeStream.write(`${title}, ${link}, ${date} \n`);
        });

        console.log('Scraping done...')
    }
});