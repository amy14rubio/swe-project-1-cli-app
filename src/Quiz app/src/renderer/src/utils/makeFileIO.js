import fs from 'node:fs';
import path from 'node:path';

export default function makeFileIO(filePath) {
  return {
    read: () => {
      try {
        const data = fs.readFileSync(filePath, 'utf-8');
        if (!data) return [];
        return JSON.parse(data);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        return [];
      }
    },
    write: (data) => {
      try {
        // ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log("Successfully wrote highscores to file:", filePath);
      } catch (error) {
        console.error("Error writing JSON:", error);
      }
    }
  };
}
