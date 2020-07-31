if (typeof document.onselectstart != "undefined") { document.onselectstart = new Function("return false"); } else { document.onmousedown = new Function("return false"); document.onmouseup = new Function("return true"); }

var bird1 = new Image();
bird1.src = "img/b1.png"

var bird2 = new Image();
bird2.src = "img/b2.png"

var red1 = new Image();
red1.src = "img/red1.png"

var red2 = new Image();
red2.src = "img/red2.png"

var pink1 = new Image();
pink1.src = "img/pink1.png"

var pink2 = new Image();
pink2.src = "img/pink2.png"

var back = new Image();
back.src = "img/back.png"

var toppipa = new Image();
toppipa.src = "img/top.png"

var botpipa = new Image();
botpipa.src = "img/bot.png"

var b1dead = new Image();
b1dead.src = "img/b1dead.png"

var reddead = new Image();
reddead.src = "img/redmati.png"

var pinkdead = new Image();
pinkdead.src = "img/pinkdeadfix.png"


function mulaiKanvas() {
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')

    canvas.width = canvas.scrollWidth
    canvas.height = canvas.scrollHeight

    var cW = canvas.width
    var cH = canvas.height

    var bgS = 0, start = false
    function splash() {
        ctx.clearRect(0, 0, cW, cH)
        ctx.drawImage(back, bgS--, 0)
        if (bgS == -1599) {
            bgS = 0
        }
        ctx.font = "Bold 50px arial"
        ctx.strokeText("READY", 300, 400)
        ctx.font = "Bold 40px Comic Sans MS"
        ctx.fillText("CARA BERMAIN", 230, 100)
        ctx.font = "Bold 15px Comic Sans MS"
        ctx.fillText("- Silahkan pilih jenis burung di bagian kanan (jika tidak memilih, burung akan default biru) ", 80, 150)
        ctx.font = "Bold 15px Comic Sans MS"
        ctx.fillText("- Click pada area permainan untuk membuat burung anda naik", 160, 200)
        ctx.font = "Bold 15px Comic Sans MS"
        ctx.fillText("- Bantulah burung mu agar terbang dengan melewati rintangan yang ada", 130, 250)
        ctx.font = "Bold 20px Comic Sans MS"
        ctx.fillText("CETAK SKOT SETINGGI MUNGKIN BUKTIKAN LAH BAHWA KAU HEBAT !!!", 20, 320)

        const heroRed = document.querySelector('.button1')
        const heroPink = document.querySelector('.button2')
        playerhero = bird1
        playerhero2 = bird2
        playerdead = b1dead
        heroRed.addEventListener('click', function(){
            playerhero = red1
            playerhero2 = red2
            playerdead = reddead
        })
        heroPink.addEventListener('click', function(){
            playerhero = pink1
            playerhero2 = pink2
            playerdead = pinkdead
        })
        
    }
    var inSplash = setInterval(splash, 30)

    document.addEventListener("click", function (event) {
        if (start === false) {
            start = true
            clearInterval(inSplash)
            utama()
        }
    })

    function utama() {
        var naik = false
        function bg() {
            this.x = 0;
            this.render = function () {
                ctx.drawImage(back, this.x--, 0)
                if (this.x == -1599) {
                    this.x = 0
                }
            }
        }
        var latar = new bg();

        

        function Karakter() {
            this.x = 100; this.y = 200; this.w = 90, this.h = 90, this.i = 0;
            this.render = function () {
                if (naik) {
                    ctx.drawImage(playerhero2, this.x, this.y += 5)
                    this.i++
                    if (this.i == 5) {
                        naik = false
                        this.i = 0
                    }
                } else {
                    ctx.drawImage(playerhero, this.x, this.y += 5)
                }
            }
        }
        var karakter = new Karakter();

        var pipa = [];
        randomPipa()

        function randomPipa() {
            var x = 800, y = 0, w = 50, h = 300;
            var random = Math.floor(Math.random() * 250);
            pipa.push({ "x": x, "y": y - random, "w": w, "h": h });
        }
        var obstacle = 0

        function end() {
            clearInterval(interval)
            ctx.clearRect(0, 0, cW, cH)
            latar.render()
            renderPipa();
            ctx.drawImage(playerdead, karakter.x, karakter.y)

            ctx.font = "bold 60px arial"
            ctx.fillText("KAMU MATI !!!", 210, 120)
            ctx.font = "bold 40px arial"
            ctx.strokeText("Skor anda adalah : " + skor, 220, 400)
            document.addEventListener("click", function (event) {
                window.location.reload()
            })


        }
        let skor = 0, tambahNilai = true
        function poinSkor() {
            skor += 10
        }




        function hit() {
            for (let i = 0; i < pipa.length; i++) {
                var p = pipa[i]
                if ((karakter.x + karakter.w > p.x && karakter.y < p.y + p.h && karakter.x < p.x + p.w) || (karakter.x + karakter.w > p.x && karakter.y + karakter.h > p.y + p.h + 220 && karakter.x < p.x + p.w)) {
                    end();

                } else if (p.x + p.w < karakter.x) {
                    if (tambahNilai) {
                        poinSkor();
                        tambahNilai = false
                    }
                }
            }
            if (karakter.y <= 0) {
                end()
            }
            if (karakter.y + karakter.h > cH) {
                end()
            }
        }

        function renderPipa() {
            for (i = 0; i < pipa.length; i++) {
                var p = pipa[i];
                ctx.drawImage(toppipa, p.x--, p.y)
                ctx.drawImage(botpipa, p.x--, p.y + p.h + 220)

                if (p.x + p.w < 0) {
                    pipa.splice(i, 1);
                    tambahNilai = true
                }
            }
            obstacle++;
            if (obstacle === 200) {
                randomPipa()
                obstacle = 0
            }
        }

        function animasi() {
            ctx.save();
            ctx.clearRect(0, 0, cW, cH);
            latar.render()
            karakter.render();
            renderPipa()
            ctx.font = "bold 40px Arial"
            ctx.fillText("skor : " + skor, 600, 50)
            ctx.restore();
            hit()

        }
        var interval = setInterval(animasi, 30);


        ctx.canvas.addEventListener('click', function (event) {
            karakter.y -= 70
            naik = true
        })
    }//end

}


window.addEventListener('load', function (event) {
    mulaiKanvas()
    alert(" du yu redi tu lus ?")
    
})