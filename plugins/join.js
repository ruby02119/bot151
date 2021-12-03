let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, isPrems, isOwner}) => {
    /* let thumbfoto = await(await fetch('https://telegra.ph/file/39bbded9693c9338069fd.jpg')).buffer()
    thumbfoto secara default sudah ada di global config.js saya, namun jika global mu tidak ada silahkan uncomment ini. kamu juga bisa mengganti foto nya.
    */
    if (!args[0]) throw `Link nya mana?`
    let [_, code] = args[0].match(linkRegex) || []
    let user = db.data.users[m.sender]
    if (!code) throw 'Link Salah'
    if (!(isPrems || isOwner)) {
        if (!db.data.settings.publicjoin) {
            m.reply('Fitur join untuk publik tidak aktif.\nSilahkan hubungi owner.')
            this.sendContact(m.chat, global.owner[0], conn.getName(global.owner[0] + '@s.whatsapp.net'), m)
            /*
            publicjoin ada di enable.js
            you can remove this.
            */
        }
        if (user.joincount === 2 ) throw `Kamu sudah melebihi token/limit memasukkan bot ke dalam group!`
        user.joincount += 1
        let res = await conn.acceptInvite(code)
        var jumlahHari = 86400000 * 0.5
        var now = new Date() * 1
        if (now < global.db.data.chats[res.gid].expired) global.db.data.chats[res.gid].expired += jumlahHari
        else global.db.data.chats[res.gid].expired = now + jumlahHari
        m.reply(`Berhasil join grup ${res.gid}\nBot akan keluar secara otomatis setelah: ${msToDate(global.db.data.chats[res.gid].expired - now)}.\nToken joincount mu: ${user.joincount}/1`)
        conn.reply(global.owner[0] + '@s.whatsapp.net', `@${m.sender.split`@`[0]} telah menambahkan *${conn.user.name}* ke ${res.gid}, bot akan keluar dalam waktu: ${msToDate(global.db.data.chats[res.gid].expired - now)}`, 0,  { contextInfo: { mentionedJid: [m.sender]}})
        await conn.sendButtonLoc(res.gid, await(await fetch(thumbfoto)).buffer(), `
*${conn.user.name}* adalah bot whatsapp yang dibangun dengan Nodejs, *${conn.user.name}* diundang oleh @${m.sender.split`@`[0]}
        
ketik *${usedPrefix}menu* untuk melihat daftar perintah
Bot akan keluar secara otomatis setelah ${msToDate(global.db.data.chats[res.gid].expired - now)}`.trim(), watermark, 'Menu', `${usedPrefix}?`, null, { contextInfo: { mentionedJid: [m.sender] } })
    } else if (!isOwner || isPrems) {
        if (users.joincount < 3) throw `Kamu sudah melebihi token/limit memasukkan bot ke dalam group!`
        user.joincount += 1
        let res = await conn.acceptInvite(code)
        var jumlahHari = 86400000 * 30
        var now = new Date() * 1
        if (now < global.db.data.chats[res.gid].expired) global.db.data.chats[res.gid].expired += jumlahHari
        else global.db.data.chats[res.gid].expired = now + jumlahHari
        m.reply(`Berhasil join grup ${res.gid}\nBot akan keluar secara otomatis setelah: ${msToDate(global.db.data.chats[res.gid].expired - now)}.\nToken joincount mu: ${user.joincount}/3`)
        conn.reply(global.owner[0] + '@s.whatsapp.net', `@${m.sender.split`@`[0]} telah menambahkan *${conn.user.name}* ke ${res.gid}, bot akan keluar dalam waktu: ${msToDate(global.db.data.chats[res.gid].expired - now)}`, 0,  { contextInfo: { mentionedJid: [m.sender]}})
        await conn.sendButtonLoc(res.gid, await(await fetch(thumbfoto)).buffer(), `
*${conn.user.name}* adalah bot whatsapp yang dibangun dengan Nodejs, *${conn.user.name}* diundang oleh @${m.sender.split`@`[0]}
        
ketik *${usedPrefix}menu* untuk melihat daftar perintah
Bot akan keluar secara otomatis setelah: ${msToDate(global.db.data.chats[res.gid].expired - now)}`.trim(), watermark, 'Menu', `${usedPrefix}?`, null, { contextInfo: { mentionedJid: [m.sender] } })
    } else if (isOwner) {
        if (!args[1]) throw `Masukkan format yang benar! format: .join <link> <jumlah hari>`
        let res = await conn.acceptInvite(code)
        var jumlahHari = 86400000 * args[1]
        var now = new Date() * 1
        if (now < global.db.data.chats[res.gid].expired) global.db.data.chats[res.gid].expired += jumlahHari
        else global.db.data.chats[res.gid].expired = now + jumlahHari
        m.reply(`Berhasil join grup ${res.gid}\nBot akan keluar secara otomatis setelah: ${msToDate(global.db.data.chats[res.gid].expired - now)}`)
        await conn.sendButtonLoc(res.gid, await(await fetch(thumbfoto)).buffer(), `
*${conn.user.name}* adalah bot whatsapp yang dibangun dengan Nodejs, *${conn.user.name}* diundang oleh @${m.sender.split`@`[0]}
        
ketik *${usedPrefix}menu* untuk melihat daftar perintah
Bot akan keluar secara otomatis setelah: ${msToDate(global.db.data.chats[res.gid].expired - now)}`.trim(), watermark, 'Menu', `${usedPrefix}?`, null, { contextInfo: { mentionedJid: [m.sender] } })
    }
}
handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['tools']

handler.command = /^join$/i

module.exports = handler

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " hari " + hours + " jam " + minutes + " menit";
    // +minutes+":"+sec;
}
