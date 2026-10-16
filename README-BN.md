# Sabiha Birthday Gift — Mobile First Edition (বাংলা নির্দেশিকা)

এটি ফোনে QR স্ক্যান করে খোলার জন্য বানানো। একবারে একটি স্ক্রিনই দেখা যাবে; বাটনে চাপলে পরের স্ক্রিন খুলবে।

## স্ক্রিনের ক্রম
1. **Countdown Lock** — ২৪ অক্টোবর ২০২৬, বাংলাদেশ সময় রাত ১২টা পর্যন্ত লক থাকবে।
2. **Automatic Celebration** — কাউন্টডাউন শূন্য হলেই স্বয়ংক্রিয়ভাবে জন্মদিনের শুভেচ্ছা, কনফেটি ও Celebration screen খুলবে।
3. Cake / Make a Wish
4. Photo Gallery
5. Birthday Letter (খামে ট্যাপ করলে চিঠি খুলবে)
6. Final Surprise / Confetti

কাউন্টডাউন চলাকালীন Next/Back বা অন্য কোনো বাটন দিয়ে সারপ্রাইজে ঢোকা যাবে না। এটি ব্রাউজারের JavaScript-ভিত্তিক UI lock; ফাইলের কোডে সরাসরি পরিবর্তন করলে যে কেউ লক বদলাতে পারে।

## ফাইল
- `index.html`: সব স্ক্রিনের HTML
- `style.css`: ফোনের ছোট স্ক্রিন, safe-area, টাচ বাটন ও responsive layout
- `script.js`: screen navigation, countdown, confetti
- `assets/photos/`: নিজের ছবি

## নিজের ছবি যোগ
`assets/photos/`-এ `photo1.jpg`, `photo2.jpg`, `photo3.jpg` নামে তিনটি ছবি রাখবে। অনুমতি ছাড়া কারও ব্যক্তিগত ছবি প্রকাশ কোরো না।

## কাউন্টডাউন
`script.js`-এর একদম শুরুতে:
`const BIRTHDAY_UNLOCK = "2026-10-24T00:00:00+06:00";`
এখানে জন্মদিনের তারিখ/সময় আছে। বর্তমান সেটিং: **২৪ অক্টোবর ২০২৬, বাংলাদেশ সময় রাত ১২টা**। সময় বদলাতে হলে ISO ফরম্যাটে `+06:00` রেখে তারিখ/সময় সম্পাদনা করো।

## GitHub Pages-এ প্রকাশ
1. GitHub-এ নতুন **Public repository** তৈরি করো, যেমন `sabiha-birthday-gift`।
2. ZIP Extract করো।
3. ভেতরের `index.html`, `style.css`, `script.js`, `assets` ফোল্ডার repository-র root-এ upload করো (ZIP ফাইল একা upload করলেই হবে না)।
4. **Settings → Pages → Build and deployment**-এ `Deploy from a branch` নির্বাচন করো।
5. Branch `main`, folder `/(root)` নির্বাচন করে Save করো।
6. GitHub Pages deployment সম্পূর্ণ হলে GitHub-দেওয়া URL ফোনে খুলে পরীক্ষা করো। URL সাধারণত `https://YOUR-USERNAME.github.io/sabiha-birthday-gift/`-এর মতো হবে; এটি উদাহরণ, আসল URL নয়।

## QR কোড কীভাবে বানাবে
- ওয়েবসাইট লাইভ হলে সেই সঠিক URL কপি করো।
- QRCode Monkey বা অন্য QR generator-এ URL paste করে static QR তৈরি করো।
- PNG ডাউনলোড করে কার্ডে প্রিন্ট করো অথবা সরাসরি পাঠাও।
- অন্য ফোনের ক্যামেরা দিয়ে scan করে নিশ্চিত হও যে সাইট খুলছে।
- এই project-এ QR image আগে থেকে বসানো নেই; লাইভ URL পাওয়ার পর QR generator দিয়ে তৈরি করো। এতে QR স্ক্যান করলে সত্যিকারের GitHub Pages URL-ই খুলবে।

## ফোনে ব্যবহারের টিপস
- ফোনের Chrome-এ live URL খোলো।
- Portrait mode-এ ব্যবহার করো; প্রতিটি বাটন বড় রাখা হয়েছে।
- Welcome screen-এ QR স্ক্যান করে ঢুকলে প্রথমে শুধু Welcome দেখাবে। Next বাটন ব্যবহার করে একে একে বাকি স্ক্রিনে যাবে।
- Public repository-তে রাখা ছবি ও লেখা অনলাইনে দেখা যেতে পারে; ব্যক্তিগত তথ্য বা পাসওয়ার্ড দিও না।


## Developer Preview Mode (ডেভেলপারদের জন্য)
লাইভ সাইট প্রকাশ করার পর নিজের ফোন/ব্রাউজারে এই URL খোলো:
`https://YOUR-USERNAME.github.io/sabiha-birthday-gift/?preview=1`

- Countdown পেজে Developer Preview panel দেখা যাবে।
- Celebration, Cake, Gallery, Letter, Final page বাটন দিয়ে পেজগুলো আগে থেকেই দেখতে পারবে।
- `Exit preview` চাপলে সাধারণ visitor URL-এ ফিরে যাবে।
- সাধারণ QR কোডে `?preview=1` থাকবে না, তাই দর্শকরা visitor countdown-ই দেখবে।
- এটি গোপনীয়তা/নিরাপত্তার শক্ত ব্যবস্থা নয়; URL-এর `preview=1` যে কেউ যোগ করতে পারে। তাই এটি কেবল visual preview, secret/private content সুরক্ষার জন্য নয়।
- QR কোড তৈরি করার সময় অবশ্যই সাধারণ URL ব্যবহার করবে, `?preview=1`-সহ URL নয়।
