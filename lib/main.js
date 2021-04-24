const core = require('@actions/core');
const HTML5ToPDF = require("../topdf")

async function run() {
    try {
        const defaults = {"printBackground": "true"};

        const htmlFile = core.getInput('htmlFile');
        const outputFile = core.getInput('outputFile');
        const pdfOptions = core.getInput('pdfOptions');

        console.log(`Start convert ${htmlFile} to PDF`);

        const html5ToPDF = new HTML5ToPDF({
            launchOptions:{
                executablePath: '/usr/bin/google-chrome',
                args:['--no-sandbox', '--headless', '--disable-gpu']},
            pdfOptions: pdfOptions? Object.assign(JSON.parse(pdfOptions), defaults) : {"printBackground": true},
            inputPath: htmlFile,
            outputPath: outputFile,
        })

        await html5ToPDF.start()
        await html5ToPDF.build()
        await html5ToPDF.close()
        console.log("PDF Generate DONE:",outputFile)

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();