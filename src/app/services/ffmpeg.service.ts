import { Injectable } from "@angular/core";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"
@Injectable({
    providedIn: "root"
})

export class FFmpegService {
    isReady = false;
    isRunning = false;
    private ffmpeg;

    constructor(){
        this.ffmpeg = createFFmpeg({
            log: true
        });
    }

    async init(){
        if(this.isReady){
            return;
        }
        await this.ffmpeg.load();
        this.isReady = !this.isReady;
    }

    // SERVICE GENERATING SCREENSHOT
    async getScreenshot(file:File) {
        this.isRunning = true;
        const data = await fetchFile(file);
        this.ffmpeg.FS("writeFile", file.name, data);
        const seconds = [4,5,6];
        const commands: string[] = [];
        const screenshots: string[] = [];

        seconds.forEach(second => {
            commands.push(
                // Input File
                "-i", file.name,
                "-ss", `00:00:0${second}`,
                "-frames:v", "1",
                "-filter:v", "scale=510:-1",
                `output_0${second}.png`
            );
        });
        await this.ffmpeg.run(...commands);

        // GENERATE SCREENSHOT URL FROM BINARY DATA
        seconds.forEach(second => {
            const screenshotFile = this.ffmpeg.FS("readFile", `output_0${second}.png`);
            const blob = new Blob([
                screenshotFile.buffer
            ], {
                type: "image/png"
            })
            const url = URL.createObjectURL(blob);
            screenshots.push(url);
        });

        this.isRunning = false;

        return screenshots;
    }

    // CREATE BLOB FROM URL
    async blobFromUrl(url: string){
        const response = await fetch(url);
        return response.blob();
    }
}