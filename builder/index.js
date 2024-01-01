import { spawn } from "child_process";
import * as fs from "fs";
import { join } from "path";
import { cwd } from "process";

const basePath = join(cwd());
const distPath = join(basePath, "/dist");

function cmd(command) {
  console.log(command);
  const p = spawn(command.split(" ")[0], command.split(" ").slice(1), {
    cwd: basePath,
  });
  p.stdout.on("data", function (data) {
    console.log(data.toString());
  });
  p.stderr.on("data", function (data) {
    console.log(data.toString());
  });
  return new Promise((resolveFunc) => {
    p.on("exit", function (code) {
      console.log("child process exited with code " + code.toString() + "\n");
      resolveFunc(code);
    });
  });
}

// create dist folder
console.log("PREPARE DIST FOLDER");
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true });
}
fs.mkdirSync(distPath);

// build website
console.log("BUILD PRODUCTION WEBSITE");
await cmd(
  "docker build -t andrea-prod-website -f ./website/Dockerfile.prod ./website"
);

// save website
console.log("SAVE WEBSITE IMAGE");
await cmd(
  "docker save --output ./dist/andrea-prod-website.tar andrea-prod-website"
);

// build dashboard
console.log("BUILD PRODUCTION DASHBOARD");
await cmd(
  "docker build -t andrea-prod-dashboard -f ./dashboard/Dockerfile.prod ./dashboard"
);

// save dashboard
console.log("SAVE DASHBOARD IMAGE");
await cmd(
  "docker save --output ./dist/andrea-prod-dashboard.tar andrea-prod-dashboard"
);

// copy compose
console.log("COPY PRODUCTION COMPOSE FILE");
fs.copyFileSync("./docker-compose.prod.yml", "./dist/docker-compose.yml");

// copy volumes
console.log("ZIP DASHBOARD DB VOLUMES");
await cmd('sudo tar -zcvf ./dist/strapi_data.tar.gz /var/lib/docker/volumes/case-andrea_dashboard-data');
