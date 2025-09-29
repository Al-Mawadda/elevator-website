<?php include_once('posts.php');?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title><?= $product['title'] ?></title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
  <link rel="stylesheet" href="assets/css/style.css"/> <!-- اختياري لو عندك CSS خارجي -->
</head>
<body class="bg-gray-50 text-gray-800 font-sans">

  <main class="max-w-6xl mx-auto px-4 py-10">

    <!-- العنوان -->
    <header class="mb-8 text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-900"><?= $product['title'] ?></h1>
      <p class="text-gray-600 mt-2"><?= $product['subtitle'] ?></p>
    </header>

    <!-- ===== تبويبات السكشن الأول ===== -->
    <section class="mb-12">
     <div id="tabs1" class="relative flex justify-center gap-8 border-b border-gray-200 pb-3" role="tablist">
  <button class="tab1-btn text-blue-900 font-semibold pb-2" data-tab="1">المصعد</button>
  <button class="tab1-btn text-gray-500 font-semibold pb-2" data-tab="2">المواصفات</button>
  <span id="indicator1" 
        class="absolute bottom-0 h-[3px] bg-blue-900 rounded-full transition-all duration-300" 
        style="width:40px; left:0;">
  </span>
</div>

      <div class="mt-6 space-y-6">
        <!-- تبويب 1 -->
        <div class="tab1-panel fade-in" data-tab="1">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <img src="<?= $product['tabs1'][0]['img'] ?>" class="w-full rounded-2xl shadow-lg object-cover">
            <div class="bg-white p-6 rounded-2xl shadow-md">
              <h2 class="text-2xl font-bold text-blue-800 mb-3"><?= $product['tabs1'][0]['title'] ?></h2>
              <p class="text-gray-700"><?= $product['tabs1'][0]['text'] ?></p>
            </div>
          </div>
        </div>

        <!-- تبويب 2 -->
        <div class="tab1-panel hidden" data-tab="2">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <img src="<?= $product['tabs1'][1]['img'] ?>" class="w-full rounded-2xl shadow-lg object-cover">
            <div class="bg-white p-6 rounded-2xl shadow-md">
              <h2 class="text-2xl font-bold text-blue-800 mb-3"><?= $product['tabs1'][1]['title'] ?></h2>
              <ul class="list-disc list-inside text-gray-700 space-y-1">
                <?php foreach ($product['tabs1'][1]['list'] as $spec): ?>
                  <li><?= $spec ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== تبويبات السكشن الثاني ===== -->
    <section>
      <div id="tabs2" class="relative flex justify-center gap-8 border-b border-gray-200 pb-3" role="tablist">
  <button class="tab2-btn text-blue-900 font-semibold pb-2" data-tab="1">المحرك</button>
  <button class="tab2-btn text-gray-500 font-semibold pb-2" data-tab="2">العتلات</button>
  <button class="tab2-btn text-gray-500 font-semibold pb-2" data-tab="3">التفاصيل</button>
  <span id="indicator2" 
        class="absolute bottom-0 h-[3px] bg-blue-900 rounded-full transition-all duration-300" 
        style="width:40px; left:0;">
  </span>
</div>


      <div class="mt-6 space-y-6">
        <!-- تبويبات السكشن الثاني تولد من المصفوفة -->
        <?php foreach ($product['tabs2'] as $i => $tab): ?>
          <div class="tab2-panel <?= $i === 0 ? 'fade-in' : 'hidden' ?>" data-tab="<?= $i+1 ?>">
            <div class="grid md:grid-cols-2 gap-8 items-start">
              <img src="<?= $tab['img'] ?>" class="w-full rounded-2xl shadow-lg object-cover">
              <div class="bg-white p-6 rounded-2xl shadow-md">
                <h2 class="text-2xl font-bold text-blue-800 mb-3"><?= $tab['title'] ?></h2>
                <?php if (!empty($tab['text'])): ?>
                  <p class="text-gray-700 mb-3"><?= $tab['text'] ?></p>
                <?php endif; ?>
                <?php if (!empty($tab['list'])): ?>
                  <ul class="space-y-1 text-gray-700">
                    <?php foreach ($tab['list'] as $item): ?>
                      <li><?= $item ?></li>
                    <?php endforeach; ?>
                  </ul>
                <?php endif; ?>

                <?php if (!empty($tab['slides'])): ?>
                  <div id="detailSlides" class="relative min-h-[160px]">
                    <?php foreach ($tab['slides'] as $j => $slide): ?>
                      <article class="detail-slide absolute inset-0 <?= $j===0?'':'hidden' ?>" data-index="<?= $j ?>">
                        <p class="text-gray-700 mb-3"><?= $slide['text'] ?></p>
                        <ul class="space-y-1 text-gray-700">
                          <?php foreach ($slide['list'] as $point): ?>
                            <li><?= $point ?></li>
                          <?php endforeach; ?>
                        </ul>
                      </article>
                    <?php endforeach; ?>
                  </div>
                  <div class="mt-4 flex items-center justify-between">
                    <button id="detailPrev" class="px-4 py-2 bg-blue-600 text-white rounded-lg">السابق</button>
                    <div class="text-sm text-gray-600">جزء <span id="detailIndex">1</span> من <span id="detailTotal"><?= count($tab['slides']) ?></span></div>
                    <button id="detailNext" class="px-4 py-2 bg-blue-600 text-white rounded-lg">التالي</button>
                  </div>
                <?php endif; ?>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </section>
  </main>

  <script src="../assets/js/java.js"></script>
</body>
</html>
