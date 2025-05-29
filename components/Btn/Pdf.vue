<template>
    <button @click="printContent()"
            class="bg-[#A40B0D] hover:bg-[#8E2F2A] text-white py-2 px-6 max-sm:px-4 rounded-md flex items-center gap-1">
    <img src="../../assets/img/pdf.png" alt="pdf 아이콘" class="w-5 h-5" />
    PDF<span class="inline-block max-sm:hidden text-[#EDF3FF]">다운로드</span>
    </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    // 인쇄할 영역의 클래스 이름을 prop으로 받습니다.
    targetClass: {
        type: String,
        required: true
    }
});

// function printContent() {
//     const printAreaElement = document.querySelector(`.${props.targetClass}`);

//     if (printAreaElement) {
//         // 현재 body의 내용을 저장합니다.
//         const originalContents = document.body.innerHTML;
//         // printArea의 내용만 body로 대체합니다.
//         document.body.innerHTML = printAreaElement.innerHTML;

//         // 인쇄 대화 상자를 엽니다.
//         window.print();

//         // 인쇄가 완료되면 (혹은 대화 상자가 닫히면) 원래 body 내용으로 복원합니다.
//         // 비동기적으로 처리될 수 있으므로, setTimeout을 사용하여 약간의 지연을 줍니다.
//         // 또는 window.matchMedia를 사용하여 인쇄 상태 변경을 감지할 수도 있습니다.
//         setTimeout(() => {
//             document.body.innerHTML = originalContents;
//             // 인쇄 후 페이지 상태가 불안정해질 수 있으므로, 필요에 따라 페이지를 새로고침하거나 Vue 라우터를 사용하여 다시 로드할 수 있습니다.
//             // 여기서는 간단히 새로고침을 예시로 들었으나, 사용자 경험에 따라 조절해야 합니다.
//             // window.location.reload(); // 필요하다면 주석을 해제하세요.
//         }, 500); // 500ms 후 복원
//     } else {
//         console.error(`Error: Element with class "${props.targetClass}" not found for printing.`);
//         alert('인쇄할 영역을 찾을 수 없습니다.');
//     }
// }

function printContent() {
    const printAreaElement = document.querySelector(`.${props.targetClass}`);

    if (printAreaElement) {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('팝업이 차단되어 인쇄를 실행할 수 없습니다.');
            return;
        }

        // head에 있는 스타일, 링크 태그를 모두 복사
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
            .map((node) => node.outerHTML)
            .join('\n');

        printWindow.document.write(`
            <html>
            <head>
                <title>인쇄 미리보기</title>
                ${styles}
                <style>
                    body {
                        font-family: sans-serif;
                        padding: 20px;
                        background: white;
                        color: black;
                    }
                </style>
            </head>
            <body>
                ${printAreaElement.innerHTML}
            </body>
            </html>
        `);

        printWindow.document.close();

        // 인쇄 준비 완료 후 실행
        printWindow.focus();
        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    } else {
        console.error(`Error: Element with class "${props.targetClass}" not found for printing.`);
        alert('인쇄할 영역을 찾을 수 없습니다.');
    }
}
</script>
