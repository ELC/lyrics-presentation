function createPPT() {
    var pptx = new PptxGenJS();

    pptx.setTitle("Presentation created with ELC's Presentation Generator");

    pptx.defineSlideMaster({
        title: 'Template',
        bkgd: '000000',
        objects: [{
            'placeholder': {
                options: {
                    name: 'body',
                    type: 'body',
                    x: 0,
                    y: 0,
                    w: "100%",
                    h: "100%",
                    align: "center",
                    fontSize: 44,
                    color: 'FFFFFF',
                    fontFace: 'Verdana',
                    valign: 'middle',
                    paraSpaceAfter: '6',
                    paraSpaceBefore: '6'
                },
                text: ''
            }
        }]
    });

    var text = document.getElementById('lyrics').value

    parseLyrics(text).forEach(verse => {
        if (verse === "---") {
            createSlide(pptx, '');
            return;
        }

        createSlide(pptx, verse);
    });

    pptx.save("Presentation - Created with ELCs Presentation Generator");
}

function parseLyrics(text) {
    return text.replace(/[\r\n]{3,}/, "\n\n").split("\n\n");
}

function createSlide(pptx, text) {
    var slide = pptx.addNewSlide('Template');
    slide.addText(text.toUpperCase(), {
        placeholder: 'body'
    });
}

function clearText() {
    document.getElementById('lyrics').value = '';
}

function changeLang(locale) {
    document.webL10n.setLanguage(locale);
}

window.addEventListener('localized', function () {
    document.getElementById('lyrics').value = document.webL10n.get('verse1') + "\n\n";
    document.getElementById('lyrics').value += document.webL10n.get('verse2') + "\n\n";
    document.getElementById('lyrics').value += document.webL10n.get('separator') + "\n\n";
    document.getElementById('lyrics').value += document.webL10n.get('verse1') + "\n\n";
    document.getElementById('lyrics').value += document.webL10n.get('verse2') + "\n\n";
    document.getElementById('lyrics').value += document.webL10n.get('verse3');
}, false);