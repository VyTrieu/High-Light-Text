function createPagination(totalPages, page) {
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if (page > 1) {
    //hiện nút lùi về nếu trang hiện tại lớn hơn 1
    liTag += `<li onclick="show(${page - 1});createPagination(totalPages, ${page - 1})">|◁</li>`;
  }

  if (page > 2 && totalPages >= 5) {
    //trang hiện tại lớn hơn 2 thì hiện vol. 1 đầu tiên
    liTag += `<li onclick="show(1);createPagination(totalPages, 1)">Vol. 1</li>`;
    if (page > 3 && totalPages > 5) {
      //trang hiện tại lớn hơn 3 và tổng trang > 5 thì hiện ... phía trước
      liTag += `<li>...</li>`;
    }
  }

  // hiện bao nhiêu trang trước trang hiện tại, lưu ý chỉ áp dụng cho tổng trang & trang từ 5 trở lên
  if (page == totalPages && totalPages > 2) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1 && totalPages > 2) {
    beforePage = beforePage - 1;
  }
  // hiện bao nhiêu trang sau trang hiện tại, lưu ý chỉ áp dụng cho tổng trang & trang từ 5 trở lên
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  //Tự động tạo mục lục
  for (var i = beforePage; i <= afterPage; i++) {
    if (i > totalPages) {
      //i lớn hơn trang tổng --> ngắt, ko tự tạo thêm liTag
      continue;
    }
    if (i == 0) {
      //nếu i = 0 && beforePage = 0 --> sẽ tự + 1
      i = i + 1;
    }
    if (i == page) {
      //i = trang hiện tại --> thêm class active
      active = "active";
    } else {
      //còn lại xóa class active
      active = "";
    }
    liTag += `<li class="${active}" onclick="show(${i}); createPagination(totalPages, ${i})">Vol. ${i}</li>`;
  }

  if (page < totalPages - 1 && totalPages >= 5) {
    //trang hiện tại nhỏ hơn tổng trang - 1
    if (page < totalPages - 2 && totalPages > 5) {
      //thêm ... khi trang hiện tại < tổng trang -2 và tổng trang > 5
      liTag += `<li>...</li>`;
    }
    liTag += `<li onclick="show(${totalPages}); createPagination(totalPages, ${totalPages})">Vol. ${totalPages}</li>`;
  }

  if (page < totalPages) {
    //trang hiện tại < tổng trang --> hiện next button
    liTag += `<li onclick="show(${page + 1}); createPagination(totalPages, ${page + 1})">▷|</li>`;
  }
  element.innerHTML = liTag; //cập nhật class active
  return liTag;
}

function show(vol) {
  let temp;
  vol = "vol_" + vol;
  for (let i = 1; i <= totalPages; i++) {
    temp = "vol_" + i;
    if (temp != vol) {
      document.getElementById(temp).style.display = "none";
    }
  }
  document.getElementById(vol).style.display = "block";
}

function highLight(chapter, regex) {
  let array = chapter.getElementsByTagName("a");
  for (let i = 0; i <= array.length - 1; i++) {
    if (array[i].innerText.search(regex) == 0){
      array[i].classList.add("highlight");
    }
    else {
      array[i].classList.remove("highlight");
    }
  }
}

function goToChapter() {
  let found = false;
  var content = document.querySelectorAll(".listChapter");
  let chapter = document.getElementById("chapter").value;
  var strRaw = String.raw `${str}\s(${chapter}\s).*`;
  let regex = new RegExp(strRaw,'gi');

  if (chapter == "") {
    alert("Vui lòng nhập số chương cần đọc");
    chapter = 0;
    found = true;
  }
  
  if (chapter!= 0) {
    for (let obj of content) {
      if (obj.innerText.search(regex) > 0) {
        page = parseInt(obj.id.match(/\d+/gi)[0]);
        found = true;
        show(page);
        highLight(obj, regex);
      }
      else {
        highLight(obj, regex);
      }
    }
    element.innerHTML = createPagination(totalPages, page);
  }

  if (found == false) {
    alert("Chương bạn kiếm hiện không có");
  }
}

function getEnter(e) {
  if (event.keyCode == 13) {
    goToChapter();
  }
}
