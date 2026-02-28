const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to compile Java files with versioning and zip packaging
function compileJava(files, version) {
    const buildDir = path.join(__dirname, 'build');
    const zipFile = path.join(__dirname, `j2me-app-v${version}.zip`);
    const compiledFiles = files.map(file => path.join(buildDir, path.basename(file, '.java') + '.class'));

    // Create build directory if it doesn't exist
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir);
    }

    // Compile Java files
    exec(`javac -d ${buildDir} ${files.join(' ')}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error compiling Java files: ${stderr}`);
            return;
        }

        console.log('Compilation successful.');

        // Create zip package
        exec(`zip -r ${zipFile} ${buildDir}/*`, (zipErr, zipStdout, zipStderr) => {
            if (zipErr) {
                console.error(`Error creating zip file: ${zipStderr}`);
                return;
            }

            console.log(`Zip package created: ${zipFile}`);
        });
    });
}

module.exports = { compileJava };