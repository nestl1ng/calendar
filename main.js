
let today = new Date();
let dayInt = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();
// body календаря
let calendarBody = document.getElementById("days");
let calendarBody2 = document.getElementById("months");
let mes = document.getElementById("month");
let weekdays = document.getElementById("weekdays");


let months = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь"
];
let nextbtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let nextbtn2 = document.getElementById("next2");
let prevBtn2 = document.getElementById("prev2");
let god = document.getElementById("year");
let mess = document.querySelector(".month");

nextbtn.onclick = function() {
	next();
};
prevBtn.onclick = function() {
	previous();
};
nextbtn2.onclick = function() {
	next2();
};
prevBtn2.onclick = function() {
	previous2();
};
god.onclick = function() {
	showYear(year);
    
};

showCalendar(month, year);



function showYear(year) {
    calendarBody.innerHTML = "";
    calendarBody2.innerHTML = "";
    weekdays.style.display="none";
    nextbtn.style.display="none";
    prevBtn.style.display="none";
    nextbtn2.style.display="block";
    prevBtn2.style.display="block";
    mes.style.display="none";
    mess.classList.add('month2');
    mess.classList.remove('month');

    
    // mes.style.display="none";
    for (let month = 0; month < 12; month++) {
        // создать li с текстовым содержимым и добавить к body
		let cell = document.createElement("li");
        let cellText = document.createTextNode(months[month]);
		// добавление атрибутов даты к одному элементу даты li
		cell.setAttribute("data-month", month+1);
		cell.setAttribute("data-year", year);
		// добавление li в body календаря
        cell.classList.add("singleMonths");
		cell.appendChild(cellText);
		calendarBody2.appendChild(cell);      
	}
    let smenaMonth = document.querySelectorAll(".singleMonths");
    for( let i = 0; i < smenaMonth.length; i++){
        smenaMonth[i].onclick = function() {
            let month1 = smenaMonth[i].getAttribute("data-month");
            year = smenaMonth[i].getAttribute("data-year");
            month = month1-1;
             calendarBody2.innerHTML = "";
             showCalendar(month, year);
             nextbtn.style.display="block";
             prevBtn.style.display="block";
             nextbtn2.style.display="none";
             prevBtn2.style.display="none";
             mes.style.display="block";
            mess.classList.add('month');
            mess.classList.remove('month2');
        };
	  }		
    
    
}

function showCalendar(month, year) {
	// получает день недели для этой даты
	let firstDay = new Date(year, month).getDay();
	// очистка всех предыдущих ячеек
    calendarBody.innerHTML = "";
    calendarBody2.innerHTML = "";
	// проверка количества дней в этом месяце для контроля цикла
	let totalDays = daysInMonth(month, year);

	// добавление пустых полей, чтобы дата начиналась в правильный день недели
	blankDates(firstDay);
	// добавление дат в календарь
	for (let day = 1; day <= totalDays; day++) {
        // создать li с текстовым содержимым и добавить к body
		let cell = document.createElement("li");
		let cellText = document.createTextNode(day);
        // добавление активного class, если день совпадает с сегодняшним
		if (
			dayInt === day &&
			month === today.getMonth() &&
			year === today.getFullYear()
		) {
			cell.classList.add("active");
		}
        for (var mes in dats) {
            if(mes==month){
                for(var days in dats[mes]){
                    if(days==day){
                        cell.classList.add("holidays");
                        let ul = document.createElement("div");
                        ul.classList.add("sub_menu");
                        cell.appendChild(ul);
                        let li = document.createElement("h2");
                        let liText = document.createTextNode(dats[mes][day]);
                        li.appendChild(liText);
                        ul.appendChild(li);
                    }
                }
            }
          }

		// добавление атрибутов даты к одному элементу даты li
		cell.setAttribute("data-day", day);
		cell.setAttribute("data-month", month);
		cell.setAttribute("data-year", year);
        

		// добавление li в body календаря
		cell.classList.add("singleDay");
		cell.appendChild(cellText);
		calendarBody.appendChild(cell);
        
	}

	// set month string value
	document.getElementById("month").innerHTML = months[month];
	// set year string value
	document.getElementById("year").innerHTML = year;
}

function daysInMonth(month, year) {
	// день 0 здесь возвращает последний день ПРЕДЫДУЩЕГО месяца
	return new Date(year, month + 1, 0).getDate();
}


function blankDates(count) {
	// цикл, чтобы добавить правильное количество пустых дней в календарь
    if(count===0){
        count=7;
    }
	for (let x = 1; x < count; x++) {
		let cell = document.createElement("li");
		let cellText = document.createTextNode("");
		cell.appendChild(cellText);
		calendarBody.appendChild(cell);
	}
}

function next() {
	year = month === 11 ? year + 1 : year;
	month = (month + 1) % 12;
	showCalendar(month, year);
}

function previous() {
	year = month === 0 ? year - 1 : year;
	month = month === 0 ? 11 : month - 1;
	showCalendar(month, year);
}

function next2() {
	year = year+1;
    document.getElementById("year").innerHTML = year;
	showYear(year);
}

function previous2() {
	year = year-1;
    document.getElementById("year").innerHTML = year;
	showYear(year);
}
    
