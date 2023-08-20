const { fetchUrl, sleep } = require("../../lib/Function")

module.exports = {
    name: "tekateki",
    alias: ["tteki"],
    desc: "Entertaiment Teka Teki",
    type: "entertainment",
    start: async(killua, m) => {
        if (tekateki.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
        let fetch = await fetchUrl(global.api("zenz", "/entertainment/tekateki", {}, "apikey"))
        let result = await fetch.result
        killua.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 60 detik`, m).then(() => {
            tekateki[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
            console.log("Jawaban: " + result.jawaban)
        })
        await sleep(60000)
        if (tekateki.hasOwnProperty(m.sender.split('@')[0])) {
            killua.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tekateki[m.sender.split('@')[0]]}`, m)
            delete tekateki[m.sender.split('@')[0]]
        }
    }
}