console.log("Shit Works")
const nicknameForm = document.querySelector(`form`)
const outputStats = document.querySelector(`.stats`)


const updateStats = (dat) => {

    const data = dat.data;
    console.log(data);

    outputStats.innerHTML = `
      <div class="up-side">
        <img class="img-thumbnail bg-dark border border-dark " src="${data.platformInfo.avatarUrl}" alt="Profile picture">
        <h2 id="nickname" class="text-center">${data.platformInfo.platformUserHandle} <span id="color">${data.userInfo.countryCode}</span></h2>
      </div>
      <div class="down-side">
        <div class="row row-cols-1 row-cols-md-3 g-4 down-side">
          <div class="col">
            <div class="card h-100 bg-dark">
              <div class="card-body">
                <h5 class="card-title">K/D</h5>
                <p class="card-text">${data.segments[0].stats.kd.displayValue}</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 bg-dark">
              <div class="card-body">
                <h5 class="card-title">Win Rate: ${data.segments[0].stats.wlPercentage.displayValue}</h5>
                <p class="card-text">Wins: ${data.segments[0].stats.wins.displayValue}</p>
                <p class="card-text">Losses: ${data.segments[0].stats.losses.displayValue}</p>
                <p class="card-text">Ties: ${data.segments[0].stats.ties.displayValue}</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 bg-dark">
              <div class="card-body">
                <h5 class="card-title">HS%: ${data.segments[0].stats.headshotPct.displayValue}</h5>
                <p class="card-text">Kills: ${data.segments[0].stats.kills.displayValue}</p>
                <p class="card-text">Deaths: ${data.segments[0].stats.deaths.displayValue}</p>
                <p class="card-text">Headshots: ${data.segments[0].stats.headshots.displayValue}</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 bg-dark">
              <div class="card-body">
                <h5 class="card-title">Extra Info</h5>
                <p class="card-text">Shoots Fired: ${data.segments[0].stats.shotsFired.displayValue}</p>
                <p class="card-text">Shoots Hit: ${data.segments[0].stats.shotsHit.displayValue}</p>
                <p class="card-text">Hours: ${data.segments[0].stats.timePlayed.displayValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    if(outputStats.classList.contains(`d-none`)){
        outputStats.classList.remove(`d-none`)
    }
    localStorage.setItem(`Id`, data.platformInfo.platformUserId);
}

async function Api(id) {
    const response = await fetch(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${id}`, { 
        method: "GET", 
        headers: {
            "TRN-Api-Key": "b204fe92-b96c-44cb-a207-4656b28534e6"
          }
    })
    const json = await response.json()
    console.log(json)
    updateStats(json);
}

nicknameForm.addEventListener(`submit`, e =>{
    // prevent defult action
    e.preventDefault();

    // Get nickname value
    const nickname = nicknameForm["nickname"].value;
    console.log(`${nickname}`);
    Api(`${nickname}`);
    nicknameForm.reset();

    //update ui
})