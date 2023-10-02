import { Promise } from "bluebird";
import FileSaver from "file-saver";
import JSZip from "jszip";

const downloadByBulk = (urls: string[], latency: number) => {
    const downloader = async (url: string) => {
        return await fetch(`${url}?maxDelay=${latency}`).then(resp => resp.blob());
    }

    return Promise.map(
        urls,
        downloader,
        { concurrency: 30 }
    );
}

const downloaderZip = (blobs: any) => {
    const zip = JSZip();
    blobs.forEach((blob: any, i: number) => {
        const ext = blob.type.split("/")[1]
        zip.file(`document_${i}.${ext}`, blob);
    });
    zip.generateAsync({ type: 'blob' }).then(zipFile => {
        const currentDate = new Date().getTime();
        return FileSaver.saveAs(zipFile, `document_${currentDate}.zip`);
    });
}

const downloadZip = (nummberDownload: number, latency: number) => {
    const urls = Array.from({ length: nummberDownload }, () => process.env.NEXT_PUBLIC_API as string)
    return downloadByBulk(urls, latency).then(downloaderZip);
}

export default downloadZip