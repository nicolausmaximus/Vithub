const downloadExcelLink = document.getElementById('downloadExcelLink');

(async() => {
    const downloadExcelResponse = await fetch('/downloadExcel');
    const downloadExcelBlob = await downloadExcelResponse.blob();
    const downloadExcelObjectURL = URL.createObjectURL(downloadExcelBlob);
    downloadExcelLink.href = downloadExcelObjectURL;
})();