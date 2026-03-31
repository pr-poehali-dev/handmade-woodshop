import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/0353c29c-9de5-495b-a4ba-80581b188aa1/files/c87a9d55-8e81-448d-8514-367f5668cb28.jpg";
const MASTER_IMG = "https://cdn.poehali.dev/projects/0353c29c-9de5-495b-a4ba-80581b188aa1/files/84829bd8-96a2-4c07-9400-010128d0bff6.jpg";
const CATALOG_IMG = "https://cdn.poehali.dev/projects/0353c29c-9de5-495b-a4ba-80581b188aa1/files/48c58bb6-0628-4b81-846f-f9b2b9c9d858.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "master", label: "О мастере" },
  { id: "process", label: "Процесс" },
  { id: "reviews", label: "Отзывы" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
];

const PRODUCTS = [
  { id: 1, name: "Разделочная доска «Дуб»", price: 1800, size: "medium", wood: "Дуб", style: "Минимализм", img: HERO_IMG },
  { id: 2, name: "Салатница «Орех»", price: 3400, size: "large", wood: "Орех", style: "Классика", img: CATALOG_IMG },
  { id: 3, name: "Подставка под горячее", price: 950, size: "small", wood: "Ясень", style: "Минимализм", img: HERO_IMG },
  { id: 4, name: "Деревянная ложка", price: 650, size: "small", wood: "Дуб", style: "Эко", img: MASTER_IMG },
  { id: 5, name: "Поднос «Сосна»", price: 2200, size: "large", wood: "Сосна", style: "Скандинав", img: CATALOG_IMG },
  { id: 6, name: "Набор для кухни", price: 4500, size: "medium", wood: "Орех", style: "Классика", img: HERO_IMG },
];

const PROCESS_STEPS = [
  { num: "01", title: "Выбор материала", desc: "Только качественная древесина от проверенных поставщиков. Дуб, орех, ясень, сосна — каждый вид дерева имеет свой характер." },
  { num: "02", title: "Обработка вручную", desc: "Каждое изделие вырезается и шлифуется вручную. Никаких конвейеров — только инструмент, опыт и время." },
  { num: "03", title: "Отделка натуральными маслами", desc: "Финишное покрытие льняным или тиковым маслом. Безопасно для продуктов, подчёркивает природную красоту дерева." },
  { num: "04", title: "Контроль качества", desc: "Перед отправкой каждое изделие проходит личную проверку мастера. Только идеальное изделие покидает мастерскую." },
];

const REVIEWS = [
  { name: "Анна М.", city: "Москва", text: "Заказала разделочную доску в подарок — все в восторге! Качество выше всяких похвал, упаковка бережная.", rating: 5 },
  { name: "Сергей К.", city: "Санкт-Петербург", text: "Салатница из ореха — просто произведение искусства. Использую каждый день, дерево живёт и дышит.", rating: 5 },
  { name: "Елена В.", city: "Казань", text: "Брала набор для кухни. Быстрая доставка, очень красивое исполнение. Буду заказывать ещё!", rating: 5 },
  { name: "Дмитрий П.", city: "Екатеринбург", text: "Подставки под горячее — идеальные. Муж тоже оценил, теперь хочет поднос. Скоро закажем снова.", rating: 5 },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    size: "all",
    wood: "all",
    priceMax: 10000,
    style: "all",
  });

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filters.size !== "all" && p.size !== filters.size) return false;
    if (filters.wood !== "all" && p.wood !== filters.wood) return false;
    if (filters.style !== "all" && p.style !== filters.style) return false;
    if (p.price > filters.priceMax) return false;
    return true;
  });

  const handleNav = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    scrollTo(id);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => handleNav("home")} className="flex items-center gap-2">
            <span className="text-2xl">🌲</span>
            <span className="font-cormorant text-xl font-semibold tracking-wide text-foreground">Уральский резчик</span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-link transition-colors ${activeSection === item.id ? "text-foreground font-medium" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => handleNav(item.id)} className="nav-link text-left py-1">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="pt-16 min-h-screen flex flex-col">
        <div className="flex-1 grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0">
            <p className="font-golos text-xs uppercase tracking-[0.2em] text-accent mb-6">Ручная работа · Натуральное дерево</p>
            <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-foreground mb-6">
              Изделия из<br />
              <em className="not-italic font-medium" style={{ color: "hsl(25, 45%, 28%)" }}>живого дерева</em>
            </h1>
            <div className="divider-organic" />
            <p className="font-golos text-base text-muted-foreground leading-relaxed max-w-sm mb-10">
              Каждое изделие создаётся вручную с любовью к материалу.
              Тепло дерева в вашем доме — это не просто вещь, это история.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-wood" onClick={() => handleNav("catalog")}>
                Смотреть каталог
              </button>
              <button className="btn-outline-wood" onClick={() => handleNav("master")}>
                О мастере
              </button>
            </div>
            <div className="mt-16 flex gap-8">
              <div>
                <p className="font-cormorant text-3xl font-semibold text-foreground">5+</p>
                <p className="text-xs text-muted-foreground mt-1">лет опыта</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-cormorant text-3xl font-semibold text-foreground">100+</p>
                <p className="text-xs text-muted-foreground mt-1">изделий создано</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-cormorant text-3xl font-semibold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground mt-1">натуральных масел</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
            <img src={HERO_IMG} alt="Деревянные изделия" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20" />
            <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm p-4 border border-border">
              <p className="font-cormorant text-lg font-medium text-foreground">Разделочная доска «Дуб»</p>
              <p className="font-golos text-sm font-semibold mt-1" style={{ color: "hsl(30, 55%, 42%)" }}>от 1 800 ₽</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-4 px-8 flex items-center gap-8 overflow-x-auto">
          {["Ольха", "Орех", "Ясень", "Сосна", "Берёза", "Клён"].map((wood) => (
            <span key={wood} className="text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap">
              {wood}
            </span>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24" style={{ backgroundColor: "#f5ede0" }}>
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="font-golos text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(30, 55%, 42%)" }}>Наши работы</p>
            <h2 className="section-title mb-2">Каталог изделий</h2>
            <div className="divider-organic" />
          </div>

          {/* Filters */}
          <div className="bg-background border border-border p-6 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Размер</label>
              <select
                value={filters.size}
                onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                className="w-full bg-transparent border border-border px-3 py-2 text-sm text-foreground focus:outline-none"
              >
                <option value="all">Все</option>
                <option value="small">Маленький</option>
                <option value="medium">Средний</option>
                <option value="large">Большой</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Порода дерева</label>
              <select
                value={filters.wood}
                onChange={(e) => setFilters({ ...filters, wood: e.target.value })}
                className="w-full bg-transparent border border-border px-3 py-2 text-sm text-foreground focus:outline-none"
              >
                <option value="all">Все</option>
                <option value="Дуб">Дуб</option>
                <option value="Орех">Орех</option>
                <option value="Ясень">Ясень</option>
                <option value="Сосна">Сосна</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Цена до: {filters.priceMax.toLocaleString()} ₽
              </label>
              <input
                type="range"
                min={500}
                max={10000}
                step={100}
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: +e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Стиль</label>
              <select
                value={filters.style}
                onChange={(e) => setFilters({ ...filters, style: e.target.value })}
                className="w-full bg-transparent border border-border px-3 py-2 text-sm text-foreground focus:outline-none"
              >
                <option value="all">Все</option>
                <option value="Минимализм">Минимализм</option>
                <option value="Классика">Классика</option>
                <option value="Эко">Эко</option>
                <option value="Скандинав">Скандинав</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-cormorant text-2xl">
              Ничего не найдено по выбранным фильтрам
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-cormorant text-xl font-medium text-foreground leading-tight">{product.name}</h3>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 whitespace-nowrap">{product.wood}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      {product.style} · {product.size === "small" ? "Маленький" : product.size === "medium" ? "Средний" : "Большой"}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-cormorant text-2xl font-semibold text-foreground">{product.price.toLocaleString()} ₽</p>
                      <button className="btn-wood text-xs py-2 px-4">В корзину</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MASTER */}
      <section id="master" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img src={MASTER_IMG} alt="Мастер за работой" className="w-full aspect-[3/4] object-cover" />
              <div className="absolute -bottom-6 -right-6 p-6 hidden md:block" style={{ backgroundColor: "hsl(30, 55%, 42%)", color: "#f5ede0" }}>
                <p className="font-cormorant text-3xl font-light">8 лет</p>
                <p className="font-golos text-xs uppercase tracking-widest mt-1">в ремесле</p>
              </div>
            </div>
            <div>
              <p className="font-golos text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(30, 55%, 42%)" }}>Познакомьтесь</p>
              <h2 className="section-title mb-4">Алексей Дровов —<br /><em className="not-italic font-light">мастер-краснодеревщик</em></h2>
              <div className="divider-organic" />
              <p className="font-golos text-base text-muted-foreground leading-relaxed mb-6">
                Я влюбился в дерево ещё в детстве, когда дед показал мне, как из простой доски можно вырезать живую форму.
                Прошли годы учёбы и практики, сотни часов работы с инструментом.
              </p>
              <p className="font-golos text-base text-muted-foreground leading-relaxed mb-8">
                Сегодня каждое моё изделие — это разговор с материалом. Дерево подсказывает форму,
                я лишь помогаю ей появиться на свет. Каждый сучок и прожилка — это история дерева,
                которая теперь будет жить в вашем доме.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "Award", text: "Диплом краснодеревщика" },
                  { icon: "Leaf", text: "Только натуральные материалы" },
                  { icon: "Heart", text: "Авторское исполнение" },
                  { icon: "Package", text: "Гарантия качества" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-accent" />
                    </div>
                    <span className="text-sm text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="btn-wood" onClick={() => handleNav("contacts")}>Написать мастеру</button>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 wood-texture" style={{ backgroundColor: "hsl(38, 15%, 91%)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-golos text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(30, 55%, 42%)" }}>Как создаётся изделие</p>
            <h2 className="section-title">Процесс создания</h2>
            <div className="divider-organic mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%+1rem)] w-8 h-px bg-border" />
                )}
                <div className="mb-5">
                  <span className="font-cormorant text-5xl font-light opacity-40" style={{ color: "#c4a46b" }}>{step.num}</span>
                </div>
                <h3 className="font-cormorant text-xl font-medium text-foreground mb-3">{step.title}</h3>
                <p className="font-golos text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 relative overflow-hidden">
            <img src={CATALOG_IMG} alt="Процесс создания" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(61, 43, 26, 0.45)" }}>
              <div className="text-center" style={{ color: "#f5ede0" }}>
                <p className="font-cormorant text-3xl md:text-4xl font-light italic px-6">
                  «Дерево — живой материал,<br />и каждое изделие уникально»
                </p>
                <p className="font-golos text-sm mt-4 opacity-80">— Алексей Дровов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24" style={{ backgroundColor: "#f5ede0" }}>
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="font-golos text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(30, 55%, 42%)" }}>Говорят покупатели</p>
            <h2 className="section-title">Отзывы</h2>
            <div className="divider-organic" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.name} className="bg-background border border-border p-8 relative">
                <div className="absolute top-6 right-8 font-cormorant text-6xl leading-none opacity-20" style={{ color: "#c4a46b" }}>"</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-sm" style={{ color: "hsl(30, 55%, 42%)" }}>★</span>
                  ))}
                </div>
                <p className="font-cormorant text-xl font-light text-foreground leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="w-9 h-9 bg-secondary flex items-center justify-center">
                    <span className="font-cormorant text-lg font-semibold text-foreground">{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-golos text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="font-golos text-xs text-muted-foreground">{review.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="font-golos text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(30, 55%, 42%)" }}>Логистика</p>
            <h2 className="section-title">Доставка</h2>
            <div className="divider-organic" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "Package", title: "Бережная упаковка", desc: "Каждое изделие тщательно упаковывается в крафтовую бумагу и стружку. Изделие защищено от повреждений при перевозке." },
              { icon: "Truck", title: "Доставка по России", desc: "Отправляем через СДЭК, Почту России и Яндекс.Доставку. Срок доставки 2–7 дней в зависимости от региона." },
              { icon: "MapPin", title: "Самовывоз в Москве", desc: "Можно забрать лично из мастерской в Москве. Адрес уточняется при оформлении заказа." },
            ].map((item) => (
              <div key={item.icon} className="border border-border p-8">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center mb-5">
                  <Icon name={item.icon} size={22} className="text-accent" />
                </div>
                <h3 className="font-cormorant text-xl font-medium text-foreground mb-3">{item.title}</h3>
                <p className="font-golos text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="border border-border p-8" style={{ backgroundColor: "hsl(38, 15%, 90%)" }}>
            <h3 className="font-cormorant text-2xl font-medium text-foreground mb-4">Условия доставки</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Бесплатная доставка при заказе от 3 000 ₽",
                "Стоимость доставки по Москве — 300 ₽",
                "Доставка по России — от 350 до 800 ₽",
                "Срок изготовления индивидуального заказа — 7–14 дней",
                "Возможна доставка в страны СНГ",
                "Возврат в течение 14 дней при сохранении товарного вида",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Icon name="Check" size={16} className="text-moss mt-0.5 flex-shrink-0" />
                  <span className="font-golos text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ backgroundColor: "#3d2b1a", color: "#f5ede0" }}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="font-golos text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#c4a46b" }}>Связаться с нами</p>
              <h2 className="font-cormorant text-5xl font-light mb-4" style={{ color: "#f5ede0" }}>Напишите нам</h2>
              <div className="w-12 h-0.5 mb-8" style={{ backgroundColor: "#c4a46b" }} />
              <p className="font-golos text-base leading-relaxed mb-8" style={{ color: "rgba(245,237,224,0.7)" }}>
                Хотите сделать индивидуальный заказ, уточнить детали или просто поговорить о дереве —
                напишите нам. Отвечаем в течение нескольких часов.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                  { icon: "Mail", label: "Email", value: "hello@drevolad.ru" },
                  { icon: "MessageCircle", label: "Telegram", value: "@drevolad" },
                  { icon: "MapPin", label: "Мастерская", value: "Москва, Россия" },
                ].map((contact) => (
                  <div key={contact.icon} className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                      <Icon name={contact.icon} size={18} style={{ color: "#c4a46b" }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(245,237,224,0.5)" }}>{contact.label}</p>
                      <p className="font-golos text-sm mt-0.5" style={{ color: "#f5ede0" }}>{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,237,224,0.6)" }}>Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 text-sm focus:outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#f5ede0" }}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,237,224,0.6)" }}>Телефон или Email</label>
                  <input
                    type="text"
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-4 py-3 text-sm focus:outline-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#f5ede0" }}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,237,224,0.6)" }}>Сообщение</label>
                  <textarea
                    rows={5}
                    placeholder="Хочу заказать разделочную доску из дуба..."
                    className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#f5ede0" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 font-golos text-sm uppercase tracking-widest transition-colors"
                  style={{ backgroundColor: "#c4a46b", color: "#3d2b1a" }}
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t" style={{ backgroundColor: "rgba(61,43,26,0.9)", borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌲</span>
            <span className="font-cormorant text-lg font-medium" style={{ color: "#f5ede0" }}>Уральский резчик</span>
          </div>
          <p className="font-golos text-xs text-center" style={{ color: "rgba(245,237,224,0.5)" }}>© 2024 Уральский резчик. Изделия из дерева ручной работы.</p>
          <div className="flex gap-6">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <button key={item.id} onClick={() => handleNav(item.id)} className="font-golos text-xs transition-colors" style={{ color: "rgba(245,237,224,0.5)" }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;