let days = 0;
let chapters = 0;
let duration = 0;
let rM = 'normal';

function preparePlan() {

    // Acquire Variables
    fileTitle = document.getElementById("file-title").value;
    fileDescription = document.getElementById("file-description").value;
    fileName = document.getElementById("file-name").value;
    chaptersPerDay = document.getElementById("chapters").value;
    useStartDate = document.getElementById("use-start-date").checked;
    startDate = document.getElementById("start-date").value;
    // days = document.getElementById("days").value;
    // duration = document.getElementById("duration").value;
    // rM = document.getElementById("reading-method").value;
    selectedBooks = collectSelectedBooks();
    chapters = calculateTotalChapters(selectedBooks);
    thePlan = divideToDays(chapters, chaptersPerDay);

    // console.log(selectedBooks);
    // console.log(chapters);
    // console.log(thePlan);
    if (fileName = "") {
        fileName = "Bible Plan.pdf";
    } else {
        fileName = fileName + ".pdf";
    }
    saveToPDF(fileTitle, fileDescription, fileName);
}

function saveToPDF(fileTitle, fileDescription, fileName) {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF({
        unit: "mm"
    });
    let taskLabel = "DAILY TASK:"
    let currentDocumentPage = 1;
    let currentDocumentPageCount = 1;

    doc.setFont("calibri", "bold", "400");
    doc.setFontSize(14);

    // Write Title to page
    doc.text(fileTitle, 10, 10);
    doc.text(fileDescription, 10, 20);
    doc.text(taskLabel, 10, 30);

    offsetY = 50;

    for (let o = 0; o < thePlan.length; o++) {
        const currentDay = thePlan[o];
        // Configure Font Styling for day
        doc.setFont("calibri", "bold", "normal");
        doc.setFontSize(11);
        doc.text(currentDay.split("-")[0] + " - ", 10, offsetY);

        // Configure Font Styling for day
        doc.setFont("calibri", "italic", "400");
        doc.text(currentDay.split("-")[1], 50, offsetY, { align: "left" });

        offsetY += 10;

        if (offsetY >= 290) {
            doc.addPage();
            currentDocumentPageCount += 1;

            doc.setPage();
            currentDocumentPage += 1;

            offsetY = 10;
        }


    }

    doc.save(fileName);
}

// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

function addDays(date, days) {
    return date.setDate(date.getDate() + days);
}

function divideToDays(chapters, dailyChapters) {

    if (dailyChapters == "") {
        dailyChapters = 4;
    }
    let plan = [],
        fullTDays = 0,
        remainingChapters = 0,
        totalDays = 0;

    fullTDays = Math.floor(chapters.total / dailyChapters);
    remainingChapters = chapters.total % dailyChapters;
    totalDays = remainingChapters == 0 ? fullTDays : fullTDays + 1;

    for (let d = 0; d < totalDays; d++) {
        let currentDay = d + 1;
        let currentBook = "";
        let currentDayChaptersStart = (currentDay * dailyChapters) - (dailyChapters - 1);
        let currentDayChaptersEnd = (currentDay * dailyChapters);
        let isLast = false;
        let initDate = new Date();

        //Add Date
        if (useStartDate) {
            initDate = new Date(startDate);
        }

        if (d != 0) {
            initDate = addDays(initDate, (currentDay - 1));
        } else {
            initDate = initDate;
        }

        console.log(initDate);
        initDate = new Date(initDate);
        let day = initDate.getDate();
        let month = initDate.getMonth() + 1;
        let year = initDate.getFullYear();

        let madeDay = "Day " + currentDay + " (" + (day + "/" + month + "/" + year) + ")" + " - ";

        if ((d == (totalDays - 1)) && remainingChapters != 0) {
            // The Last Day
            currentDayChaptersEnd = (currentDay * dailyChapters) - (dailyChapters - remainingChapters);
            isLast = true;
        }


        for (let chap = currentDayChaptersStart; chap < (currentDayChaptersEnd + 1); chap++) {
            let countingChapters = 0;
            for (let t = 0; t < chapters.list.length; t++) {
                const curBook = chapters.list[t];

                if (chap > countingChapters) { // Check where we are interms of book
                    countingChapters += curBook.chapters;
                }

                if (chap > countingChapters) { // Still not there?
                    continue;
                }

                if (chap <= countingChapters) {
                    currentBook = curBook;
                }

                let offsetSize = 0;
                for (let l = 0; l < t; l++) {
                    const element = chapters.list[l];
                    if (t > 0) {
                        offsetSize += element.chapters;
                    } else {
                        continue;
                    }
                }


                currentChapter = chap - offsetSize;
                // console.log("currentBook", currentBook.name);
                // console.log("countingChapters", countingChapters);
                // console.log("chap", chap);
                // console.log("offsetSize", offsetSize);
                // console.log("currentChapter", currentChapter);
                break;
            }

            // debugger;
            if (chap == currentDayChaptersEnd) {
                madeDay += currentBook.name + " " + currentChapter + "";
            } else {
                madeDay += currentBook.name + " " + currentChapter + "; ";
            }
        }
        plan.push(madeDay);
    }
    return plan;
}

function calculateTotalChapters(selectedBooks) {
    let chapters = {
        total: 0,
        list: []
    }
    for (let i = 0; i < selectedBooks.length; i++) {
        const currentBook = selectedBooks[i];
        let testament = currentBook.split("-")[0];
        let chapterOder = currentBook.split("-")[1];
        let theBook = null;
        if (testament == "new") {
            theBook = bibleData.newTestament.books[chapterOder];
        } else {
            theBook = bibleData.oldTestament.books[chapterOder];
        }
        bookChapters = theBook.chapters;
        chapters.total += bookChapters;
        chapters.list.push(theBook);
    }

    return chapters;
}

function spawnChapter(testament) {
    let newTestamentHandel = document.getElementById("newTestamentHook");
    if (testament == "newTestament") {
        bibleData.newTestament.books.forEach(currentBook => {
            let inputGroup = document.createElement('div');
            inputGroup.setAttribute('class', 'form-check');

            let bookSelectible = document.createElement('input');
            bookSelectible.setAttribute('type', 'checkbox');
            bookSelectible.setAttribute('value', currentBook.order);
            bookSelectible.setAttribute('id', currentBook.name + "-" + currentBook.order);
            bookSelectible.setAttribute('class', 'form-check-input new-testament-checkboxes');

            let bookLabel = document.createElement('label');
            bookLabel.setAttribute('class', 'form-check-label');
            bookLabel.setAttribute('for', currentBook.name + "-" + currentBook.order);
            bookLabel.innerHTML = currentBook.name

            let column = document.createElement('div');
            column.setAttribute('class', 'col-2');

            inputGroup.appendChild(bookSelectible);
            inputGroup.appendChild(bookLabel);

            column.appendChild(inputGroup);

            newTestamentHandel.appendChild(column);
        });
    }

    let oldTestamentHandel = document.getElementById("oldTestamentHook");
    if (testament == "oldTestament") {
        bibleData.oldTestament.books.forEach(currentBook => {
            let inputGroup = document.createElement('div');
            inputGroup.setAttribute('class', 'form-check');

            let bookSelectible = document.createElement('input');
            bookSelectible.setAttribute('type', 'checkbox');
            bookSelectible.setAttribute('value', currentBook.order);
            bookSelectible.setAttribute('id', currentBook.name + "-" + currentBook.order);
            bookSelectible.setAttribute('class', 'form-check-input old-testament-checkboxes');

            let bookLabel = document.createElement('label');
            bookLabel.setAttribute('class', 'form-check-label');
            bookLabel.setAttribute('for', currentBook.name + "-" + currentBook.order);
            bookLabel.innerHTML = currentBook.name;

            let column = document.createElement('div');
            column.setAttribute('class', 'col-2');

            inputGroup.appendChild(bookSelectible);
            inputGroup.appendChild(bookLabel);

            column.appendChild(inputGroup);

            oldTestamentHandel.appendChild(column);
        });
    }
}

function checkOrUncheckAll(testament) {
    let overRule = false;
    let classed = "false";
    if (testament == 'oldTestament') {
        let allCheckBox = document.getElementsByClassName('old-testament-checkboxes');
        for (let i = 0; i < allCheckBox.length; i++) {
            const checkBox = allCheckBox[i];
            if (i == 0) {
                if (checkBox.checked == true) {
                    overRule = false;
                } else {
                    overRule = true;
                }
            }
            checkBox.checked = overRule;
        }

    }
    if (testament == 'newTestament') {
        let allCheckBox = document.getElementsByClassName('new-testament-checkboxes');
        for (let i = 0; i < allCheckBox.length; i++) {
            const checkBox = allCheckBox[i];
            if (i == 0) {
                if (checkBox.checked == true) {
                    overRule = false;

                } else {
                    overRule = true;
                }
            }
            checkBox.checked = overRule;
        }

    }
}

function collectSelectedBooks() {
    let allBooks = {
        "newTestament": [],
        "oldTestament": []
    };
    let selectedBooks = [];

    allBooks.newTestament = document.getElementsByClassName('new-testament-checkboxes');
    allBooks.oldTestament = document.getElementsByClassName('old-testament-checkboxes');

    for (let i = 0; i < allBooks.newTestament.length; i++) {
        const currentBook = allBooks.newTestament[i];
        if (currentBook.checked) {
            selectedBooks.push("new-" + currentBook.value);
        }
    }

    for (let i = 0; i < allBooks.oldTestament.length; i++) {
        const currentBook = allBooks.oldTestament[i];
        if (currentBook.checked) {
            selectedBooks.push("old-" + currentBook.value);
        }
    }

    return selectedBooks;
}

window.onload = function() {
    document.getElementById("prepplan").removeAttribute('disabled');
    spawnChapter('oldTestament');
    spawnChapter('newTestament');
}