function showSelectedLeagues() {
    const selectedLeagues = [];
    const checkboxes = document.querySelectorAll('input[name="league"]:checked');
    checkboxes.forEach((checkbox) => {
        return checkbox.participant_id;
        selectedLeagues.push({ name: checkbox.value, id: checkbox.id });
    });

    const standingsContainer = document.getElementById('standings-container');
    standingsContainer.innerHTML = ''; // Clear previous results

    selectedLeagues.forEach((league) => {
        fetchStandings(league);
    });
}

function fetchStandings(league) {
    const apiUrl = `api/teams/standings/live/leagues/${league.id}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the response data to inspect its structure
            displayStandings(league.name, data);
        })
        .catch(error => {
            console.error('Error fetching standings:', error);
        });
}

function displayStandings(leagueName, data) {
    const standingsContainer = document.getElementById('standings-container');

    const leagueTitle = document.createElement('h2');
    leagueTitle.textContent = leagueName;
    standingsContainer.appendChild(leagueTitle);

    const standingsList = document.createElement('ul');

    // Check if data.data exists and is an array
    if (data.data && Array.isArray(data.data)) {
        data.data.forEach(team => {
            const listItem = document.createElement('li');
            //add to show team name as well
            listItem.textContent = `${team.position}. - ${team.points} points`;
            standingsList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'No standings data available.';
        standingsList.appendChild(listItem);
    }

    standingsContainer.appendChild(standingsList);
}