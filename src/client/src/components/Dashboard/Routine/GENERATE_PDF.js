import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function GENERATE_PDF(routineDB) {
  console.log('Got Routine DB => ', routineDB);
  var docDefinition = {
    // a string or { width: number, height: number }
    pageSize: 'A4',
    // by default use portrait
    pageOrientation: 'landscape',
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    // pageMargins: [20, 60, 20, 60],
    content: [
      {
        // college logo
        width: 50,
        height: 50,
        image: LOGO_URI,
        margin: [60, -10, 0, 0] // [Left, Top, Right, Bottom]
      },
      // college name & logo
      {
        text: 'Barisal Information Technology College (BITC)',
        style: 'header',
        alignment: 'center'
      }, // sub title
      {
        text: 'Combined Master Routine',
        alignment: 'center',
        style: 'subheader'
      },
      // routine table
      {
        margin: [-20, 0, -20, 0], // [Left, Top, Right, Bottom]
        table: {
          headerRows: 1,
          widths: generateColumnWidth(routineDB), // Generating column header width, how much space a column would take

          body: [
            generateTableHeaderRow(routineDB), // Generating column header e.g. '9:30 am - 10:30 pm'
            generateTableBodyRow(routineDB, 'Sat', 'sat'),
            generateTableBodyRow(routineDB, 'Sun', 'sun'),
            generateTableBodyRow(routineDB, 'Mon', 'mon'),
            generateTableBodyRow(routineDB, 'Tues', 'tues'),
            generateTableBodyRow(routineDB, 'Wed', 'wed'),
            generateTableBodyRow(routineDB, 'Thu', 'thu')
          ]
        }
      }
    ],
    styles: {
      header: {
        fontSize: 25,
        bold: true,
        margin: [0, -50, 0, 3] // [Left, Top, Right, Bottom]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, -3, 0, 10]
      },
      tableDesign: {
        fontSize: 8,
        margin: [0, 5, 0, 5]
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: 'black'
      }
    },
    defaultStyle: {
      fontSize: 12
    }
  };
  // pdfMake.createPdf(docDefinition).download('bitc_routine.pdf');
  pdfMake.createPdf(docDefinition).open();
}

const generateTableHeaderRow = routineDB => {
  let alwaysAlwaysHave = 'Day';

  let routineCellHeader = routineDB
    ? routineDB.map((singlePeriodObj, index) => {
        return singlePeriodObj.period;
      })
    : [];
  if (routineDB) {
    console.log('Table Header =>', [alwaysAlwaysHave, ...routineCellHeader]);
    return [alwaysAlwaysHave, ...routineCellHeader];
  }
  return [alwaysAlwaysHave];
};

const generateColumnWidth = routineDB => {
  let alwaysAlwaysHave = 'auto'; // this for 'Day' column

  let routineCellHeader = routineDB
    ? routineDB.map((singlePeriodObj, index) => {
        return 'auto';
      })
    : [];
  if (routineDB) {
    console.log('Table Header Width =>', [
      alwaysAlwaysHave,
      ...routineCellHeader
    ]);
    return [alwaysAlwaysHave, ...routineCellHeader];
  }
  return [alwaysAlwaysHave];
};

const generateTableBodyRow = (routineDB, cellDayName, dayName) => {
  let arrayOfCellData = [cellDayName];
  if (routineDB) {
    routineDB.forEach(singlePeriod => {
      let classArray = singlePeriod.days[dayName].classes.map(singleClass => {
        singleClass.semester = singleClass.semester.replace(
          /(<([^>]+)>)/gi,
          ''
        ); //  Regex to remove html tag [in this context Removing <sup></sup>]
        let superscript = singleClass.semester.slice(-2); // taking last two of the character
        let semester = singleClass.semester.substring(
          0,
          singleClass.semester.length - 2
        ); // taking all character except last two character
        return {
          columns: [
            { text: semester, width: 'auto' },
            { text: superscript, fontSize: 8 },
            {
              text: `: (${singleClass.subject.code}) - ${
                singleClass.teacher.code
              }`,
              width: 'auto'
            }
          ]
        };
      });
      // console.log(classArray);
      arrayOfCellData.push(classArray);
    });
  }
  // console.log(cellDayName, arrayOfCellData);
  return arrayOfCellData;
};

let LOGO_URI =
  'data:image/jpeg;base64,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';

export default GENERATE_PDF;
