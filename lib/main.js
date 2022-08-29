const core = require('@actions/core');
const HTML5ToPDF = require("../topdf")

async function run() {
    try {
        const defaultParameters = {"printBackground": true};

        const htmlFile = core.getInput('htmlFile');
        const outputFile = core.getInput('outputFile');
        const pdfOptions = core.getInput('pdfOptions');

        const finalParameters = pdfOptions? Object.assign(JSON.parse(pdfOptions), defaultParameters) : defaultParameters;

        console.log(`Start convert ${htmlFile} to PDF`);
        console.log(`Running with ${JSON.stringify(finalParameters)} parameters`);

        const html5ToPDF = new HTML5ToPDF({
            launchOptions:{
                executablePath: '/usr/bin/google-chrome',
                args:['--no-sandbox', '--headless', '--disable-gpu', '--font-render-hinting=none']},
            pdfOptions: finalParameters,
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
