$(document).ready(function () {
  $("#text-div-replace").html("");

  $("#submit_video").on("click", function () {
    
    var value = $(".link-video-value").val();

    getFullUrl(value).then((fullUrl) => (value = fullUrl));
    

    let settings = {
      async: true,
      crossDomain: true,
      url: `https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index?url=${value}`,
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c5336c0802mshac468dbdde32a50p1df178jsn319514b6c46a",
        "X-RapidAPI-Host":
          "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
      },
    };
    function showToast() {
      document.getElementById("myToast").classList.remove("hidden");
      setTimeout(function () {
        document.getElementById("myToast").classList.add("hidden");
      }, 10000);
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
              src=${data.video[0]}
              class="video-link-tittok" id="link-video" type="video/mp4" />

      </video>

      <div class="flex justify-center  items-center flex-col">
          <h2 id="title-video" class="text-[23px] pt-3 pb-3 pr-[30px] text-center" >Người đăng : ${data.author[0]}</h2>
          <a id="download-video" class="text-[23px] pt-3 pb-3 rounded-[10px] bg-cyan-500 p-3 cursor-pointer download-video" download="${data.author[0]}.mp4"
              href="${data.video[0]}"> Tải xuống video</a>
              <br>
            <a class="text-[23px] pt-3 pb-3 rounded-[10px] bg-cyan-500 p-3 cursor-pointer download-mp3" download="${data.music[0]}.mp3"
              href="${data.music[0]}"> Tải xuống MP3</a>
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
              a.download=`${data.author[0]}.mp4`;
              document.body.appendChild(a);
              a.click();
              a.remove();
            });
        });
        let downloadMp3 = document.querySelector(".download-mp3");
        downloadMp3.addEventListener("click", function (event) {
          event.preventDefault();
          const url = downloadMp3.getAttribute("href");
          const filename = url.substring(url.lastIndexOf("/") + 1);
          fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download=`${data.music[0]}`;
              document.body.appendChild(a);
              a.click();
              a.remove();
            });
        });
      });
  });
});
function isTikTokLinkVideo(url) {
  const regex = /^https?:\/\/(?:www\.)?tiktok\.com\/\S*\/video\/\d+/;
  return regex.test(url);
}

function isTikTokLink(url) {
  const regex = /^https:\/\/www\.tiktok\.com\//;
  if (!regex.test(url)) {
    return false;
  }

  const videoRegex = /\/video\/(\d+)/;
  if (!videoRegex.test(url)) {
    return false;
  }

  return true;
}
async function getFullUrl(shortUrl) {
  const response = await fetch(`https://www.tiktok.com/oembed?url=${shortUrl}`);
  const json = await response.json();
  console.log(json);

  return json.author_url + "/video/" + json.embed_product_id;
}
