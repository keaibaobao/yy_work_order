import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export function htmlToPdf() {
        html2Canvas(<HTMLElement>document.querySelector('#pdfDom'), {
            allowTaint: true,
        }).then(canvas => {
            //内容的宽度
            let contentWidth = canvas.width;
            //内容高度
            let contentHeight = canvas.height;
            //一页pdf显示html页面生成的canvas高度,a4纸的尺寸[595.28,841.89];
            let pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            let leftHeight = contentHeight;
            //页面偏移
            let position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            let imgWidth = 595.28;
            let imgHeight = 841.89 / contentWidth * contentHeight;//592.28
            //canvas转图片数据
            let pageData = canvas.toDataURL('image/jpeg', 1.0);
            //新建JsPDF对象
            let PDF = new JsPDF('l', 'pt', 'a4');
            //判断是否分页
            if (leftHeight < pageHeight) {
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
            } else {
                while (leftHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    if (leftHeight > 0) {
                        PDF.addPage()
                    }
                }
            }
            //保存文件
            PDF.save("页面导出PDF文件" + '.pdf')
        })

}



