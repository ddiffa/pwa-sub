var dbPromised = idb.open("schedule", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favorite")) {
        upgradeDb.createObjectStore("favorite", { keyPath: "ID" });
    }
})

function getAllFavorite() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                var tx = db.transaction("favorite", "readonly")
                var store = tx.objectStore("favorite")
                return store.getAll()
            })
            .then(function(teams) {
                resolve(teams)
            })
    })
}

function addFavorite(id, name, img) {
        dbPromised.then(function(db) {
            var tx = db.transaction("favorite", "readwrite")
            var store = tx.objectStore("favorite")
           
            var data = {
                ID: id,
                name: name,
                crestUrl: img
            }
            store.put(data)
            return tx.complete
        }).then(function() {  
            M.toast({ html: 'tim ' + name +' telah ditambahkan di favorite' })
        })
}

function deleteFavorite(id) {
    dbPromised.then(function(db) {
        var tx = db.transaction("favorite", "readwrite")
        var store = tx.objectStore("favorite")
        store.delete(id)
        return tx.complete
    }).then(function() {
        M.toast({ html: 'tim favorite kamu telah dihapus ' })
        location.reload();
    })
}


// function getById(id) {
//     return new Promise(function(resolve, reject) {
//       dbPromised
//         .then(function(db) {
//           var tx = db.transaction("favorite", "readonly");
//           var store = tx.objectStore("favorite");
//           return store.get(id);
//         })
//         .then(function(team) {
//             if (team !==undefined) resolve(team);
//             else resolve();
//         });
//     });
//   }
  