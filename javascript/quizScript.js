let array = [`a. Ngày 09-09 nguyệt lịch.`,
    `b. Ngày 09-01 nguyệt lịch.`,
    `c. Ngày 15-08 nguyệt lịch.`,
    `d. Ngày 18-08 nguyệt lịch.`
];

let question = document.createElement('div');
question.class = 'question';
question.innerHTML = `Câu 1: Thánh Lễ của Đức Ngọc Hoàng Thượng Đế thường diễn ra vào ngày nào trong năm?`;

let response = document.createElement('div');
response.class = 'response';
for (let i = 0; i < 4; i++) {
    let response0 = document.createElement('button');
    response0.innerHTML = array[i];
    response0.append(response);
}

let button = document.createElement('button');
