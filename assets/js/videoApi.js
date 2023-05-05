$(document).ready(function () {
  let data;
  $("#text-div-replace").html("");
  function showToast() {
    document.getElementById("myToast").classList.remove("hidden");
    setTimeout(function () {
      document.getElementById("myToast").classList.add("hidden");
    }, 10000);
  }
  $("#submit_video").on("click", function () {
    var value = $(".link-video-value").val();
    if (value.split("?")[0] && value.split("/")[4].split("?")[0]) {
      value = value.split("?")[0];
    } else {
      showToast();
      return;
    }
    var spin = `<div class="flex  pt-4 items-center justify-center">
	<button type="button" class="flex items-center rounded-lg bg-sky-500 px-4 py-2 text-white" disabled>
	<svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
	viewBox="0 0 24 24">
	<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
	<path class="opacity-75" fill="currentColor"
	d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
	</path>
	</svg>
	<span class="font-medium"> Đang tìm... </span>
	</button>
	</div>`;
    $("#text-div-replace").html(spin);

    const settings = {
      async: true,
      crossDomain: true,
      url: `https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index?url=${value}`,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c5336c0802mshac468dbdde32a50p1df178jsn319514b6c46a",
        "X-RapidAPI-Host":
          "instagram-downloader-download-instagram-videos-stories.p.rapidapi.com",
      },
    };
    $.ajax(settings)
      .fail(function () {
        $("#text-div-replace").html("");
        showToast();
        return;
      })
      .done(function (response) {
        data = response;
        $("#text-div-replace").html(`
      <div
      class="play-video  pt-0 items-center pb-[30px] justify-center flex flex-col  md:mr-[100px] lg:mr-[100px] lg:ml-[100px]  sm:mr-[100px] sm:ml-[100px] xl:ml-[300px] xl:mr-[300px] mr-[50px] ml-[50px]">
      <video controls class="p-3 " name="media">
          <source
              src=${data.media}
              class="video-link-tittok" id="link-video" type="video/mp4" />
      </video>
      <div class="flex justify-center  items-center flex-col">
          <a id="download-video" class="text-[23px] pt-3 pb-3 rounded-[10px] bg-cyan-500 p-3 cursor-pointer download-video" download="instagram.mp4"
              href="${data.media}"> Tải xuống video</a>
              <br>
      </div>
  </div>
      `);
      let downloadLink = document.querySelector(".download-video");
      downloadLink.addEventListener("click", function (event) {
        event.preventDefault();
        const url = downloadLink.getAttribute("href");
        const filename = url.substring(url.lastIndexOf("/") + 1);
        fetch(url)
          .then((response) => response.blob())
          .then((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `video.mp4`;
            document.body.appendChild(a);
            a.click();
            a.remove();
          });
      });
        
  });
});
});

function isInstaLink(url) {
  const regex = /^https:\/\/www\.instagram\.com\/reels\/[a-zA-Z0-9-_]+\/?$/;

  if (!regex.test(url)) {
    return false;
  }
  return true;
}
