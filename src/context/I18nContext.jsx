import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const I18nContext = createContext(null);

export const SUPPORTED_LOCALES = ['fr', 'ar', 'en'];
export const DEFAULT_LOCALE = 'fr';

const translations = {
  fr: {
    nav: {
      shop: 'BOUTIQUE',
      story: 'NOTRE HISTOIRE',
      athletes: 'ATHLÈTES',
      contact: 'CONTACT',
      cart: 'PANIER',
    },
    hero: {
      location: 'CASABLANCA, MAROC',
      cta: 'ACHETER MAINTENANT',
    },
    productGrid: {
      newArrivals: 'NOUVEAUTÉS',
      viewAll: 'VOIR TOUT',
      choose: 'CHOISIR',
      selectSize: 'SÉLECTIONNER LA TAILLE',
      soldOut: 'RUPTURE DE STOCK',
    },
    productDetail: {
      newArrival: 'NOUVELLE ARRIVÉE',
      selectSize: 'SÉLECTIONNER LA TAILLE',
      quantity: 'QUANTITÉ',
      addToCart: 'AJOUTER AU PANIER',
      cashOnDelivery: 'Paiement à la livraison disponible au Maroc',
      features: 'CARACTÉRISTIQUES',
      inDetail: 'EN DÉTAIL',
      motion: 'EN MOUVEMENT',
      backToShop: 'RETOUR À LA BOUTIQUE',
      productNotFound: 'PRODUIT INTROUVABLE',
    },
    cart: {
      title: 'VOTRE PANIER',
      empty: 'Votre panier est vide.',
      addItems: 'Ajoutez des articles pour commencer.',
      subtotal: 'SOUS-TOTAL',
      shipping: 'LIVRAISON',
      calculatedAtCheckout: 'Calculé au moment du paiement',
      total: 'TOTAL',
      checkout: 'PASSER LA COMMANDE',
      cashOnDelivery: 'Paiement à la livraison disponible au Maroc',
    },
    newsletter: {
      stayConnected: 'RESTEZ CONNECTÉ',
      join: 'REJOINDRE LA NEWSLETTER',
      description: 'Accès anticipé aux lancements, histoires d\'athlètes et conseils d\'entraînement. Pas de spam.',
      placeholder: 'ADRESSE EMAIL',
      subscribe: 'S\'ABONNER',
      subscribing: 'INSCRIPTION...',
      subscribed: 'INSCRIT',
      privacyNote: 'En vous abonnant, vous acceptez notre Politique de confidentialité.',
    },
    footer: {
      tagline: 'VÊTEMENTS DE SPORT PREMIUM DE CASABLANCA',
      shop: 'BOUTIQUE',
      company: 'ENTREPRISE',
      connect: 'NOUS SUIVRE',
      allProducts: 'TOUS LES PRODUITS',
      newArrivals: 'NOUVEAUTÉS',
      bestSellers: 'BEST SELLERS',
      ourStory: 'NOTRE HISTOIRE',
      athletes: 'ATHLÈTES',
      contact: 'CONTACT',
      newsletter: 'NEWSLETTER',
      copyright: 'TOUS DROITS RÉSERVÉS.',
      privacy: 'POLITIQUE DE CONFIDENTIALITÉ',
      terms: 'CONDITIONS D\'UTILISATION',
    },
    story: {
      ourStory: 'NOTRE HISTOIRE',
      builtDifferent: 'CONÇUS DIFFÉREMMENT',
      fromCasablanca: 'De Casablanca. Pour ceux qui se lèvent tôt.',
      philosophy: 'NOTRE PHILOSOPHIE',
      intentionalDesign: 'CONCEPTION INTENTIONNELLE — TOUT CE QUE NOUS FAISONS COMMENCE PAR POURQUOI',
      philosophyText: 'Nous ne suivons pas les tendances. Nous construisons pour l\'athlète qui se lève avant l\'aube. Chaque couture, chaque tissu, chaque choix a un but. Ce n\'est pas de la mode. C\'est de la fonction élevée.',
      madeInMorocco: 'FABRIQUÉ AU MAROC',
      craftedInCasablanca: 'FABRIQUÉ AVEC SOIN À CASABLANCA',
      craftedText: 'Notre atelier à Casablanca emploie des artisans qualifiés qui comprennent que la qualité prend du temps. Chaque pièce passe par plusieurs mains avant d\'arriver aux vôtres. Nous approvisionnons des tissus premium auprès de filatures de confiance, testons chaque lot pour la durabilité, et refusons de compromettre la construction. C\'est de la fabrication lente dans un monde rapide.',
      craftedText2: 'Quand vous portez Gymwear, vous portez le résultat d\'innombrables heures de raffinement. Prototypes testés par nos athlètes. Boucles de rétroaction qui durent des mois. Des détails que vous ne verrez jamais mais que vous ressentirez à chaque séance.',
      theTeam: 'L\'ÉQUIPE',
      teamGoal: 'UNE ÉQUIPE AVEC UN OBJECTIF — CONSTRUIRE LE MEILLEUR, LAISSER LE RESTE',
      teamText: 'Nous sommes des lifters, des coureurs, des combattants. Nous construisons ce dont nous avons besoin car rien d\'autre n\'existait. Pas de département marketing. Pas de groupes de discussion. Juste des athlètes qui font de l\'équipement pour des athlètes.',
    },
    pillars: {
      brandPillars: 'PILIERS DE LA MARQUE',
      whatDrivesUs: 'CE QUI NOUS ANIME',
      intentionalDesign: 'CONCEPTION INTENTIONNELLE',
      intentionalDesignDesc: 'Chaque produit commence par un problème à résoudre. Nous concevons de l\'intérieur vers l\'extérieur — la fonction dicte la forme. Aucun détail superflu. Aucun gadget marketing. Juste de l\'ingénierie déterminée.',
      madeWithCare: 'FABRIQUÉ AVEC SOIN',
      madeWithCareDesc: 'Produit dans notre atelier de Casablanca par des artisans fiers de chaque couture. Tissus premium. Tests rigoureux. Zéro compromis. Une qualité que vous sentez à chaque répétition.',
      teamWithGoal: 'UNE ÉQUIPE AVEC UN OBJECTIF',
      teamWithGoalDesc: 'Nous sommes des athlètes qui construisent pour des athlètes. Notre équipe teste chaque prototype en conditions réelles d\'entraînement. Si ça ne performe pas, ça ne part pas. C\'est aussi simple que ça.',
    },
    athletes: {
      athletes: 'ATHLÈTES',
      theTeam: 'L\'ÉQUIPE',
      teamDesc: 'Athlètes qui incarnent l\'état d\'esprit. Pas de raccourcis. Pas d\'excuses.',
      sport: {
        powerlifting: 'POWERLIFTING',
        crossfit: 'CROSSFIT',
        bodybuilding: 'BODYBUILDING',
        olympicLifting: 'HALTÉROPHILIE OLYMPIQUE',
      },
    },
    contact: {
      getInTouch: 'NOUS CONTACTER',
      contactUs: 'CONTACTEZ-NOUS',
      contactText: 'Des questions sur les produits, les commandes ou les partenariats ? Nous serions ravis d\'échanger avec vous.',
      name: 'NOM',
      email: 'EMAIL',
      message: 'MESSAGE',
      placeholderName: 'VOTRE NOM',
      placeholderEmail: 'VOTRE EMAIL',
      placeholderMessage: 'VOTRE MESSAGE',
      sendMessage: 'ENVOYER LE MESSAGE',
      sending: 'ENVOI...',
      sent: 'MESSAGE ENVOYÉ',
      headquarters: 'SIÈGE SOCIAL',
      address: 'GYMWEAR HQ\nBOULEVARD ZERKTouni\nCASABLANCA, MAROC',
      emailLabel: 'EMAIL',
      hours: 'HORAIRES',
      hoursWeek: 'LUN - VEN : 9H - 18H GMT+1',
      hoursSat: 'SAM : 10H - 16H GMT+1',
      hoursSun: 'DIM : FERMÉ',
    },
    catalog: {
      collection: 'COLLECTION',
      allProducts: 'TOUS LES PRODUITS',
      filter: {
        all: 'TOUT',
        new: 'NOUVEAUTÉS',
        bestsellers: 'BEST SELLERS',
        sale: 'SOLDES',
      },
      sort: {
        featured: 'À LA UNE',
        priceAsc: 'PRIX : CROISSANT',
        priceDesc: 'PRIX : DÉCROISSANT',
        nameAsc: 'NOM : A-Z',
      },
    },
  },
  ar: {
    nav: {
      shop: 'المتجر',
      story: 'قصتنا',
      athletes: 'الرياضيين',
      contact: 'اتصل بنا',
      cart: 'العربة',
    },
    hero: {
      location: 'الدار البيضاء، المغرب',
      cta: 'تسوق الآن',
    },
    productGrid: {
      newArrivals: 'وصول جديد',
      viewAll: 'عرض الكل',
      choose: 'اختر',
      selectSize: 'اختر المقاس',
      soldOut: 'نفد المخزون',
    },
    productDetail: {
      newArrival: 'وصول جديد',
      selectSize: 'اختر المقاس',
      quantity: 'الكمية',
      addToCart: 'أضف إلى العربة',
      cashOnDelivery: 'الدفع عند الاستلام متاح في المغرب',
      features: 'المميزات',
      inDetail: 'بالتفصيل',
      motion: 'في الحركة',
      backToShop: 'العودة للمتجر',
      productNotFound: 'المنتج غير موجود',
    },
    cart: {
      title: 'عربتك',
      empty: 'عربتك فارغة.',
      addItems: 'أضف بعض العناصر للبدء.',
      subtotal: 'المجموع الفرعي',
      shipping: 'الشحن',
      calculatedAtCheckout: 'يُحسب عند الدفع',
      total: 'الإجمالي',
      checkout: 'إتمام الطلب',
      cashOnDelivery: 'الدفع عند الاستلام متاح في المغرب',
    },
    newsletter: {
      stayConnected: 'ابق على تواصل',
      join: 'انضم للنشرة البريدية',
      description: 'وصول مبكر للإصدارات، قصص الرياضيين، ونصائح التدريب. لا رسائل مزعجة.',
      placeholder: 'عنوان البريد الإلكتروني',
      subscribe: 'اشتراك',
      subscribing: 'جاري الاشتراك...',
      subscribed: 'تم الاشتراك',
      privacyNote: 'بالاشتراك، أنت توافق على سياسة الخصوصية.',
    },
    footer: {
      tagline: 'ملابس رياضية متميزة من الدار البيضاء',
      shop: 'المتجر',
      company: 'الشركة',
      connect: 'تابعنا',
      allProducts: 'كل المنتجات',
      newArrivals: 'وصول جديد',
      bestSellers: 'الأكثر مبيعاً',
      ourStory: 'قصتنا',
      athletes: 'الرياضيون',
      contact: 'اتصل بنا',
      newsletter: 'النشرة البريدية',
      copyright: 'جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
    },
    story: {
      ourStory: 'قصتنا',
      builtDifferent: 'مصممة بشكل مختلف',
      fromCasablanca: 'من الدار البيضاء. للذين يستيقظون باكراً.',
      philosophy: 'فلسفتنا',
      intentionalDesign: 'تصميم متعمد — كل ما نقوم به يبدأ من لماذا',
      philosophyText: 'نحن لا نتبع الاتجاهات. نحن نبني للرياضي الذي يستيقظ قبل الفجر. كل غرزة، كل قماش، كل اختيار له هدف. هذا ليس موضة. هذا وظيفة مرتفعة.',
      madeInMorocco: 'مصنوع في المغرب',
      craftedInCasablanca: 'مصنوع بعناية في الدار البيضاء',
      craftedText: 'ورشتنا في الدار البيضاء توظف حرفيين مهرة يفهمون أن الجودة تستغرق الوقت. كل قطعة تمر عبر أيدي متعددة قبل أن تصل إليك. نحن نورد أقمشة متميزة من مصانع موثوقة، نختبر كل دفعة للمتانة، ونرفض التنازل عن الجودة. هذه صناعة بطيئة في عالم سريع.',
      craftedText2: 'عندما ترتدي Gymwear، أنت ترتدي نتيجة ساعات لا حصر لها من التحسين. نماذج أولية مختبرة من قبل رياضيينا. حلقات تغذية راجعة تستمر لأشهر. تفاصيل لن تراها أبداً لكنك ستشعر بها في كل جلسة.',
      theTeam: 'الفريق',
      teamGoal: 'فريق بهدف — بناء الأفضل، ترك الباقي',
      teamText: 'نحن رافعي أثقال، عدائين، مقاتلين. نبني ما نحتاجه لأن لا شيء آخر كان موجوداً. لا قسم تسويق. لا مجموعات تركيز. فقط رياضيون يصنعون معدات لرياضيين.',
    },
    pillars: {
      brandPillars: 'أعمدة العلامة التجارية',
      whatDrivesUs: 'ما يحركنا',
      intentionalDesign: 'تصميم متعمد',
      intentionalDesignDesc: 'كل منتج يبدأ بمشكلة لحلها. نصمم من الداخل للخارج — الوظيفة تملي الشكل. لا تفاصيل زائدة. لا حيل تسويقية. فقط هندسة هادفة.',
      madeWithCare: 'مصنوع بعناية',
      madeWithCareDesc: 'مُنتج في ورشتنا بالدار البيضاء من قبل حرفيين يفخرون بكل غرزة. أقمشة متميزة. اختبارات صارمة. صفر تنازلات. جودة تشعر بها في كل تكرار.',
      teamWithGoal: 'فريق بهدف',
      teamWithGoalDesc: 'نحن رياضيون نبني للرياضيين. فريقنا يختبر كل نموذج أولي في ظروف تدريب حقيقية. إذا لم يؤدي الغرض، لا يُشحن. الأمر بهذه البساطة.',
    },
    athletes: {
      athletes: 'الرياضيون',
      theTeam: 'الفريق',
      teamDesc: 'رياضيون يجسدون العقلية. لا اختصارات. لا أعذار.',
      sport: {
        powerlifting: 'رفع الأثقال',
        crossfit: 'كروسفيت',
        bodybuilding: 'كمال الأجسام',
        olympicLifting: 'رفع أثقال أولمبي',
      },
    },
    contact: {
      getInTouch: 'تواصل معنا',
      contactUs: 'اتصل بنا',
      contactText: 'أسئلة حول المنتجات، الطلبات، أو الشراكات؟ يسعدنا التواصل معك.',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      placeholderName: 'اسمك',
      placeholderEmail: 'بريدك الإلكتروني',
      placeholderMessage: 'رسالتك',
      sendMessage: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      sent: 'تم إرسال الرسالة',
      headquarters: 'المقر الرئيسي',
      address: 'مقر Gymwear\nشارع زرقطوني\nالدار البيضاء، المغرب',
      emailLabel: 'البريد الإلكتروني',
      hours: 'ساعات العمل',
      hoursWeek: 'الإثنين - الجمعة: 9 ص - 6 م ت ع+1',
      hoursSat: 'السبت: 10 ص - 4 م ت ع+1',
      hoursSun: 'الأحد: مغلق',
    },
    catalog: {
      collection: 'المجموعة',
      allProducts: 'كل المنتجات',
      filter: {
        all: 'الكل',
        new: 'جديد',
        bestsellers: 'الأكثر مبيعاً',
        sale: 'تنزيلات',
      },
      sort: {
        featured: 'مميز',
        priceAsc: 'السعر: تصاعدي',
        priceDesc: 'السعر: تنازلي',
        nameAsc: 'الاسم: أ-ي',
      },
    },
  },
  en: {
    nav: {
      shop: 'SHOP',
      story: 'STORY',
      athletes: 'ATHLETES',
      contact: 'CONTACT',
      cart: 'CART',
    },
    hero: {
      location: 'CASABLANCA, MOROCCO',
      cta: 'SHOP NOW',
    },
    productGrid: {
      newArrivals: 'NEW ARRIVALS',
      viewAll: 'VIEW ALL',
      choose: 'CHOOSE',
      selectSize: 'SELECT SIZE',
      soldOut: 'SOLD OUT',
    },
    productDetail: {
      newArrival: 'NEW ARRIVAL',
      selectSize: 'SELECT SIZE',
      quantity: 'QUANTITY',
      addToCart: 'ADD TO CART',
      cashOnDelivery: 'Cash on delivery available across Morocco',
      features: 'FEATURES',
      inDetail: 'IN DETAIL',
      motion: 'MOTION',
      backToShop: 'BACK TO SHOP',
      productNotFound: 'PRODUCT NOT FOUND',
    },
    cart: {
      title: 'YOUR CART',
      empty: 'Your cart is empty.',
      addItems: 'Add some gear to get started.',
      subtotal: 'SUBTOTAL',
      shipping: 'SHIPPING',
      calculatedAtCheckout: 'Calculated at checkout',
      total: 'TOTAL',
      checkout: 'PROCEED TO CHECKOUT',
      cashOnDelivery: 'Cash on delivery available across Morocco',
    },
    newsletter: {
      stayConnected: 'STAY CONNECTED',
      join: 'JOIN THE NEWSLETTER',
      description: 'Early access to drops, athlete stories, and training insights. No spam.',
      placeholder: 'EMAIL ADDRESS',
      subscribe: 'SUBSCRIBE',
      subscribing: 'SUBSCRIBING...',
      subscribed: 'SUBSCRIBED',
      privacyNote: 'By subscribing you agree to our Privacy Policy.',
    },
    footer: {
      tagline: 'PREMIUM FITNESS APPAREL FROM CASABLANCA',
      shop: 'SHOP',
      company: 'COMPANY',
      connect: 'CONNECT',
      allProducts: 'ALL PRODUCTS',
      newArrivals: 'NEW ARRIVALS',
      bestSellers: 'BEST SELLERS',
      ourStory: 'OUR STORY',
      athletes: 'ATHLETES',
      contact: 'CONTACT',
      newsletter: 'NEWSLETTER',
      copyright: 'ALL RIGHTS RESERVED.',
      privacy: 'PRIVACY POLICY',
      terms: 'TERMS OF SERVICE',
    },
    story: {
      ourStory: 'OUR STORY',
      builtDifferent: 'BUILT DIFFERENT',
      fromCasablanca: 'From Casablanca. For the ones who show up.',
      philosophy: 'OUR PHILOSOPHY',
      intentionalDesign: 'INTENTIONAL DESIGN — EVERYTHING WE DO STARTS WITH WHY',
      philosophyText: 'We don\'t chase trends. We build for the athlete who shows up before sunrise. Who stays after the lights go out. Every stitch, every seam, every fabric choice serves a purpose. This is not fashion. This is function elevated.',
      madeInMorocco: 'MADE IN MOROCCO',
      craftedInCasablanca: 'CRAFTED WITH CARE IN CASABLANCA',
      craftedText: 'Our workshop in Casablanca employs skilled artisans who understand that quality takes time. Each piece passes through multiple hands before it reaches yours. We source premium fabrics from trusted mills, test every batch for durability, and refuse to compromise on construction. This is slow manufacturing in a fast world.',
      craftedText2: 'When you wear Gymwear, you\'re wearing the result of countless hours of refinement. Prototypes tested by our athletes. Feedback loops that span months. Details you\'ll never see but will feel every session.',
      theTeam: 'THE TEAM',
      teamGoal: 'A TEAM WITH A GOAL — BUILD THE BEST, LEAVE THE REST',
      teamText: 'We are lifters, runners, fighters. We build what we need because nothing else existed. No marketing department. No focus groups. Just athletes making gear for athletes.',
    },
    pillars: {
      brandPillars: 'BRAND PILLARS',
      whatDrivesUs: 'WHAT DRIVES US',
      intentionalDesign: 'INTENTIONAL DESIGN',
      intentionalDesignDesc: 'Every product begins with a problem to solve. We design from the inside out — function dictates form. No unnecessary details. No marketing gimmicks. Just purposeful engineering.',
      madeWithCare: 'MADE WITH CARE',
      madeWithCareDesc: 'Produced in our Casablanca workshop by artisans who take pride in every stitch. Premium fabrics. Rigorous testing. Zero compromises. Quality you can feel in every rep.',
      teamWithGoal: 'A TEAM WITH A GOAL',
      teamWithGoalDesc: 'We are athletes building for athletes. Our team tests every prototype in real training conditions. If it doesn\'t perform, it doesn\'t ship. Simple as that.',
    },
    athletes: {
      athletes: 'ATHLETES',
      theTeam: 'THE TEAM',
      teamDesc: 'Athletes who embody the mindset. No shortcuts. No excuses.',
      sport: {
        powerlifting: 'POWERLIFTING',
        crossfit: 'CROSSFIT',
        bodybuilding: 'BODYBUILDING',
        olympicLifting: 'OLYMPIC LIFTING',
      },
    },
    contact: {
      getInTouch: 'GET IN TOUCH',
      contactUs: 'CONTACT US',
      contactText: 'Questions about products, orders, or partnerships? We\'d love to hear from you.',
      name: 'NAME',
      email: 'EMAIL',
      message: 'MESSAGE',
      placeholderName: 'YOUR NAME',
      placeholderEmail: 'YOUR EMAIL',
      placeholderMessage: 'YOUR MESSAGE',
      sendMessage: 'SEND MESSAGE',
      sending: 'SENDING...',
      sent: 'MESSAGE SENT',
      headquarters: 'HEADQUARTERS',
      address: 'GYMWEAR HQ\nBOULEVARD ZERKTouni\nCASABLANCA, MOROCCO',
      emailLabel: 'EMAIL',
      hours: 'HOURS',
      hoursWeek: 'MON - FRI: 9AM - 6PM GMT+1',
      hoursSat: 'SAT: 10AM - 4PM GMT+1',
      hoursSun: 'SUN: CLOSED',
    },
    catalog: {
      collection: 'COLLECTION',
      allProducts: 'ALL PRODUCTS',
      filter: {
        all: 'ALL',
        new: 'NEW',
        bestsellers: 'BESTSELLERS',
        sale: 'SALE',
      },
      sort: {
        featured: 'FEATURED',
        priceAsc: 'PRICE: LOW TO HIGH',
        priceDesc: 'PRICE: HIGH TO LOW',
        nameAsc: 'NAME: A-Z',
      },
    },
  },
};

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gymwear-locale') || DEFAULT_LOCALE;
    }
    return DEFAULT_LOCALE;
  });

  const [dir, setDir] = useState('ltr');

  useEffect(() => {
    localStorage.setItem('gymwear-locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    setDir(locale === 'ar' ? 'rtl' : 'ltr');
  }, [locale]);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let result = translations[locale];
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  }, [locale]);

  const changeLocale = useCallback((newLocale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocale(newLocale);
    }
  }, []);

  return (
    <I18nContext.Provider value={{ locale, dir, t, changeLocale, SUPPORTED_LOCALES }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}