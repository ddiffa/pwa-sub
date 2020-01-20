const URL_MATCH_API = "https://api.football-data.org/v2/competitions/2021/matches";
const URL_TEAM_API = "https://api.football-data.org/v2/competitions/2021/teams";
const API_KEY = "a51a4b7586be4ece9fa2d6927d9bb430";

function getTeamList(){
    if ('caches' in window){
        caches.match(URL_TEAM_API).then(function(response){
            if (response){
                response.json().then(function(data){
                    var teamsItems ="";
                    data.teams.forEach(function(team){
                        teamsItems += templatesTeam(team);      
                        document.getElementById("team").innerHTML = teamsItems;
                    })
                })
            }
        })
    }
    fetch(URL_TEAM_API, {
        headers : {
            'X-Auth-Token' : API_KEY
        }
    })
    .then(status)
    .then(json)
    .then(function(data){
        var teamsItems ="";
        data.teams.forEach(function(team){
            teamsItems += templatesTeam(team);      
            document.getElementById("team").innerHTML = teamsItems;
        })
    })
}

function getFavoriteTeams(){
    getAllFavorite().then(function(teams){
        var allTeam = "";
        teams.forEach(function(team){
            allTeam += templatesFavorite(team);
            document.getElementById("team").innerHTML = allTeam;
        })
    })
}

function getMatchesList(){
    if ('caches' in window){
        caches.match(URL_MATCH_API).then(function(response){
            if (response){
                response.json().then(function(data){
                    var matchesItem = "";
                    data.matches.forEach(function(match){
                        matchesItem += templatesMatch(match);
                        document.getElementById("matches").innerHTML = matchesItem;
                    })
                })
            }
        })
    }
    fetch(URL_MATCH_API, {
        headers : {
            'X-Auth-Token' : API_KEY
        }
    })
    .then(status)
    .then(json)
    .then(function(data){
        var matchesItem = "";
        data.matches.forEach(function(match){
            matchesItem += templatesMatch(match);
            document.getElementById("matches").innerHTML = matchesItem;       
        })
    })
}

function status(response){
    if(response.status != 200){
        console.log("error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else{
        return Promise.resolve(response);
    }
}

function json(response){
    return response.json();
}

function error(error){
    console.log("Error : " + error);
}

function templatesTeam(team){
    var url = team.crestUrl.replace(/^http:\/\//i, 'https://');
    return `
    <div class = "col s12 m6 l4 ">
        <div class = "card small" 
        style = 
        "width: 20rem; 
        height: 19rem; 
        background-image: url('img/champions-league.jpg'); 
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        ">                                     
                <div class = "row valign-wrapper" style=" padding: 16px 16px 16px 16px;">
                    <div class = "col s9">
                        <img src = "${url}" alt="" class="rounded responsive-img">
                    </div>

                    <div class="card-content white-text">
                        <span class = "card-title">
                            <b> ${team.name}</b>
                        </span>
                    </div>
                    <div class="card-action">
                    <button id="favorite_button" onclick="addFavorite('${team.id}' , '${team.name}', '${team.crestUrl}')" class="btn red accent-3 z-depth-4"> + Add Favorite </button>
                </div>
            </div>    
            </div>
    </div>
</div>
`;
}

function templatesMatch(match){
    return `
            <div class = "col s12">
                <div class="card" 
                            style="height: 10rem; 
                            background-image: url('img/bg.png'); 
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: 50% 50%;
                           ">
                        <div class ="center-align white-text" style=" padding: 16px 16px 16px 16px;">
                            <div><h5>${match.homeTeam.name} vs ${match.awayTeam.name} </h5></div>
                            <div> <h6 >Tanggal : ${match.utcDate.split("T")[0]}</h6></div>
                            <div><b>pukul : </b> ${match.utcDate.split("T")[1].slice(0, 5)}</div>
                        </div>
                </div>
            </div>
            `;
}

function templatesFavorite(team){
    var url = team.crestUrl.replace(/^http:\/\//i, 'https://');
   return `    
   <div class = "col s12 m6 l4 ">
        <div class = "card small" 
        style = 
        "width: 20rem; 
        height: 19rem; 
        background-image: url('img/champions-league.jpg'); 
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        ">                                     
                <div class = "row valign-wrapper" style=" padding: 16px 16px 16px 16px;">
                    <div class = "col s9">
                        <img src = "${url}" alt="" class="rounded responsive-img">
                    </div>

                    <div class="card-content white-text">
                        <span class = "card-title">
                            <b> ${team.name}</b>
                        </span>
                    </div>
                    <div class="card-action">
                    <button id="favorite_button" onclick="deleteFavorite('${team.ID}')" class="btn red accent-3 z-depth-4"> - Delete From Favorite </button>
                </div>
            </div>    
            </div>
    </div>
</div>
        `;
}