const fs = require("fs");
const path = require("path");

const GLOSSARY_PATH = path.resolve(process.cwd(), "docs", "glossary");
const metadata = {};

const handleGlossaryFile = (pathname) => {
  let str = fs.readFileSync(pathname).toString();
  let headerMatch = str.match(/---(.|\n)*---/);
  if (!headerMatch) {
    console.error(`${path.basename(pathname)} contain no header.
      The format of the header should be ---<header content>---.`);
    return;
  }
  let titleMatch = headerMatch[0].match(/title:.*/);
  if(!titleMatch){
    console.error(`${path.basename(pathname)} contain no title in the header.
      Please specify title. e.g. title: xxx`);
    return;
  }
  let title = titleMatch[0].split(":")[1].trim();
  // Get the glossary content
  let content = str.slice(headerMatch[0].length, str.length);
  let glossaryContentMatch = content.match(/(?<=<!--[ ]*glossary[ ]*-->)(.|\n)*(?=<!--[ ]*end[ ]*glossary[ ]*-->)/);
  let glossaryContent;
  if (!glossaryContentMatch) {
    glossaryContent = "";
  } else {
    glossaryContent = glossaryContentMatch[0].trim();
  }
  metadata[title] = glossaryContent;
};

const generateMetadata = (pathname) => {
  if (!fs.existsSync(pathname)) {
    return;
  }
  if (fs.lstatSync(pathname).isDirectory()) {
    for (let nextPathname of fs.readdirSync(pathname)) {
      generateMetadata(path.resolve(pathname, nextPathname));
    }
  } else { // is file
    handleGlossaryFile(pathname);
  }
};

// generate metadata and store in metadata
generateMetadata(GLOSSARY_PATH);
console.log(`[Glossary Builder] ${Object.keys(metadata).length} termininologies found in glossary folder.`);

const GROSSORY_COMPONENT_PATH = path.resolve(process.cwd(), "src", "components", "GlossaryTip", "metadata.json");
fs.writeFileSync(GROSSORY_COMPONENT_PATH, JSON.stringify(metadata, null, 2));
