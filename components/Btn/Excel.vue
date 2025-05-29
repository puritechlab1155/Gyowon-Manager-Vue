<template>
    <button type="button" :data-target-table-id="targetTableId" :data-filename="filename"
        class="excel-button object-contain box-content bg-[#117841] py-3 text-[#EDF3FF] flex items-center justify-center rounded-lg hover:bg-[#359F66] focus:outline-none whitespace-nowrap"
        @click="handleClick">
        <img src="../../assets/img/exel.png" alt="엑셀 아이콘" class="w-5 h-5 mr-1 max-sm:mr-0 object-contain box-content" />
        <span class="text-[#EDF3FF] max-sm:text-sm block max-sm:hidden">엑셀 다운로드</span>
    </button>
</template>

<script setup>
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const props = defineProps({
    targetTableId: { type: String, required: true },  // <tbody가 있는 테이블의 ID>
    headerTableId: { type: String, required: true },  // <thead가 있는 테이블의 ID>
    filename: { type: String, required: true }
});

async function handleClick() {
    const headerThead = document.getElementById(props.headerTableId);
    const bodyTable = document.getElementById(props.targetTableId);

    if (!headerThead) {
        alert('thead 요소를 찾을 수 없습니다. (ID: ' + props.headerTableId + ')');
        return;
    }
    if (!bodyTable) {
        alert('바디 테이블을 찾을 수 없습니다. (ID: ' + props.targetTableId + ')');
        return;
    }

    const bodyTbody = bodyTable.querySelector('tbody');
    if (!bodyTbody) {
        alert('바디 테이블 내에 tbody를 찾을 수 없습니다.');
        return;
    }

    const headerRow = headerThead.querySelector('tr');
    if (!headerRow) {
        alert('헤더 행이 없습니다.');
        return;
    }

    const headerCells = Array.from(headerRow.querySelectorAll('th'));
    const excludeIndex = headerCells.findIndex(th => th.textContent.trim() === '관리');
    if (excludeIndex === -1) {
        alert('"관리"라는 열이 없습니다.');
        return;
    }

    const contactIndex = headerCells.findIndex(th => th.textContent.trim() === '연락처');

    const finalHeaders = headerCells
        .filter((_, idx) => idx !== excludeIndex)
        .map(th => th.textContent.trim());

    const bodyRows = [];
    bodyTbody.querySelectorAll('tr').forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        const filteredRow = cells
            .filter((_, idx) => idx !== excludeIndex)
            .map((td, idx) => {
                let text = td.textContent.trim();
                if (headerCells[idx] && headerCells[idx].textContent.trim() === '연락처') {
                    text = text.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
                }
                return text;
            });
        bodyRows.push(filteredRow);
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("회원관리 정보");

    worksheet.addRow(finalHeaders);
    bodyRows.forEach(row => worksheet.addRow(row));

    worksheet.columns = finalHeaders.map(headerText => {
        let width = 15;
        switch (headerText) {
            case '번호':
            case '성별':
                width = 7;
                break;
            case '소속교육지원청':
                width = 30;
                break;
            case '직장명':
                width = 25;
                break;
            case '연락처':
                width = 20;
                break;
            case '아이디':
            case '생년월일':
            case '전공과목':
            case '직급':
                width = 18;
                break;
            default:
                width = 15;
                break;
        }
        return { width };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    const fullFileName = `${formattedDate}_${props.filename}.xlsx`;

    saveAs(blob, fullFileName);
}
</script>

<style scoped>
.excel-button {
    padding-left: 2rem; 
    padding-right: 2rem;
}


@media (max-width: 639.9px) {
    .excel-button {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
@media (max-width: 479px) {
    .excel-button {
        padding-left: 15px;
        padding-right: 15px;
    }
}

</style>