//to get all lists in the group
w = document.querySelectorAll('.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.buofh1pr.tgvbjcpo.muag1w35.enqfppq2')

// to get last list names
x = w[w.length - 1].children[1].children[0].children

const accounts = document.querySelectorAll('div div span span div.nc684nl6 a.oajrlxb2.g5ia77u1.qu0x051f.esr5mh6w.e9989ue4.r7d6kgcz.rq0escxv.nhd2j8a9.nc684nl6.p7hjln8o.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.jb3vyjys.rz4wbd8a.qt6c0cv9.a8nywdso.i1ao9s8h.esuyzwwr.f1sip0of.lzcic4wl.oo9gr5id.gpro0wi8.lrazzd5p')


const members = [...accounts].map(account => {
    return {
        name: account.innerText,
        id: account.href.split('/')[account.href.split('/').length - 2]
    }
})

// https://drive.google.com/file/d/1czPGy2VlV_AUDtkhqR-cchRuKqsiFdmF/view?usp=sharing


// https://www.facebook.com/profile.php?id={{userID}}