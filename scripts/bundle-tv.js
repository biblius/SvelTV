import fs from 'fs'
import path from 'path';

function copyDirectoryContents(sourceDir, targetDir) {
  // Create the target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  // Read the contents of the source directory
  const files = fs.readdirSync(sourceDir);

  // Copy each file to the target directory
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    // Check if the current item is a file or a directory
    if (fs.lstatSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    } else {
      copyDirectoryContents(sourcePath, targetPath);
    }
  });
}

// Usage: node script.js source_directory target_directory
const sourceDirectory = './dist';
const targetDirectory = process.argv[2];

if (!targetDirectory) {
  console.warn('Output directory must be specified with an absolute path');
  process.exit(1);
}

copyDirectoryContents(sourceDirectory, targetDirectory);
