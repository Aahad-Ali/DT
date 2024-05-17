import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import Loader from 'Helpers/Loader';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();
const PdfComponent = ({ pdf }) => {
    const load = e => {
        return <Loader />
    }
    const [page, setPage] = useState(1)
    return (
        <>
            <Document size={'A4'} file={pdf} onLoadSuccess={load} loading={load}>
                <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
        </>
    )
}

export default PdfComponent
