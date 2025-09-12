//insanity file feel lazy to think of a better way to do this

import r1q1 from "/src/assets/r1q1.png";
import r1q2 from "/src/assets/r1q2.png";
import r1q3 from "/src/assets/r1q3.png";
import r1q4 from "/src/assets/r1q4.png";
import r2q1 from "/src/assets/r2q1.png";
import r2q2 from "/src/assets/r2q2.png";
import r2q3 from "/src/assets/r2q3.png";
import r2q4 from "/src/assets/r2q4.png";
import r2q5 from "/src/assets/r2q5.png";
import r2q6 from "/src/assets/r2q6.png";
import r2q7 from "/src/assets/r2q7.png";
import r2q8 from "/src/assets/r2q8.png";
import r2q9 from "/src/assets/r2q9.png";
import r2q10 from "/src/assets/r2q10.png";
import r2q11 from "/src/assets/r2q11.png";
import r2q12 from "/src/assets/r2q12.png";
import r2q13 from "/src/assets/r2q13.png";
import r2q14 from "/src/assets/r2q14.png";
import r3q1 from "/src/assets/r3q1.png";
import r3q2 from "/src/assets/r3q2.png";
import r3q3 from "/src/assets/r3q3.png";
import r3q4 from "/src/assets/r3q4.png";
import r4q1 from "/src/assets/r4q1.png";
import r4q2 from "/src/assets/r4q2.png";
import r4q3 from "/src/assets/r4q3.png";
import r4q4 from "/src/assets/r4q4.png";
import r4q5 from "/src/assets/r4q5.png";
import r4q6 from "/src/assets/r4q6.png";
import r5q1 from "/src/assets/r5q1.png";
import r5q2 from "/src/assets/r5q2.png";
import r5q3 from "/src/assets/r5q3.png";
import r5q4 from "/src/assets/r5q4.png";
import r5q5 from "/src/assets/r5q5.png";
import r5q6 from "/src/assets/r5q6.png";
import r5q7 from "/src/assets/r5q7.png";
import r5q8 from "/src/assets/r5q8.png";
import r5q9 from "/src/assets/r5q9.png";
import r6q1 from "/src/assets/r6q1.png";
import r6q2 from "/src/assets/r6q2.png";
import r6q3 from "/src/assets/r6q3.png";
import r6q4 from "/src/assets/r6q4.png";
import r6q5 from "/src/assets/r6q5.png"
import r6q6 from "/src/assets/r6q6.png"
import r7q1 from "/src/assets/r7q1.png"
import r7q2 from "/src/assets/r7q2.png"
import r7q3 from "/src/assets/r7q3.png"
import r7q4 from "/src/assets/r7q4.png"
import r7q5 from "/src/assets/r7q5.png"
import r7q6 from "/src/assets/r7q6.png"
import r7q7 from "/src/assets/r7q7.png"
import r8q1 from "/src/assets/r8q1.png"
import r8q2 from "/src/assets/r8q2.png"
import r8q3 from "/src/assets/r8q3.png"
import r8q4 from "/src/assets/r8q4.png"
import r8q5 from "/src/assets/r8q5.png"
import r8q6 from "/src/assets/r8q6.png"





export const choices = [
  // regle 1
  [
    {
      title: "هل يجب السماح للشخص بالدخول إلى الموقع؟",
      questionNumber: 1,
      imageUrl: r1q1,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "هل يجب أن يتحدث هذا الشخص مع طبيبه المهني؟",
      questionNumber: 2,
      imageUrl: r1q2,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "هل يجب أن يتحدث هذا الشخص عن الشعور بالعياء؟",
      questionNumber: 3,
      imageUrl: r1q3,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "هل يتم احترام القاعدة الذهبية لإنقاذ الحياة؟",
      questionNumber: 4,
      imageUrl: r1q4,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
  ],
  // regle 2
  [
    {
      title: "من أي ارتفاع يبدأ العمل في الارتفاع؟",
      questionNumber: 1,
      imageUrl: r2q1,
      choice: [
        { id: "a", text: "متر 1.5", isCorrect: true },
        { id: "b", text: "متر 1.8", isCorrect: false },
        { id: "c", text: "متر 2.0.", isCorrect: false },
        { id: "d", text: "متر 3.0", isCorrect: false },
      ],
    },
    {
      title:
        "هل من الضروري ارتداء خودة مزودت بهزام ذقنمثبت و معدل جيدا عند العمل على ارتفاع؟ ",
      questionNumber: 2,
      imageUrl: r2q2,
      choice: [
        { id: "a", text: "نعم، إنه إلزامي", isCorrect: true },
        { id: "b", text: "لا، هذا ليس إلزاميا", isCorrect: false },
        { id: "c", text: "يمكنني أن أقرر بحرية", isCorrect: false },
      ],
    },
    {
      title: "عل يمكنني الوصول بحرية إلى الأسطه لأدء العمل؟",
      questionNumber: 3,
      imageUrl: r2q3,
      choice: [
        { id: "a", text: "نعم، إذا انتبهت", isCorrect: true },
        {
          id: "b",
          text: "لا،أحتاج إلى الحصول على تصريه و تنفيد تحليل الاخطار و المحين",
          isCorrect: false,
        },
      ],
    },
    {
      title: "بأي تردد يجب فحص حالة حزام الأمان؟",
      questionNumber: 4,
      imageUrl: r2q4,
      choice: [
        { id: "a", text: "يوميا", isCorrect: true },
        { id: "b", text: "أسبوعيا", isCorrect: false },
        { id: "c", text: "قبل كل استخدام", isCorrect: false },
      ],
    },
    {
      title:
        "هل أحتاج إلى ارتداء حزام أمان عند العمل على ارتفاع في منطقة محضوة؟",
      questionNumber: 5,
      imageUrl: r2q5,
      choice: [
        {
          id: "a",
          text: "نعم،يجب أن أرتديها و أن يتم ربطها بنسبة 100% من الوقت في نقاط الربط المتعمدة ( أو إلى حبل الحياة)، و التي يحددها شخ مهترف و مختص",
          isCorrect: true,
        },
        {
          id: "b",
          text: "نعم، ولكن يسمه بفكه لفترة قصيرة من الوقت إذا كان ذلك غير مريح",
          isCorrect: false,
        },
      ],
    },
    {
      title: "عل يمكنني أن أقرر بنفسي مكان ربط الحبل الخاص بى؟",
      questionNumber: 6,
      imageUrl: r2q6,
      choice: [
        { id: "a", text: "نعم، بدون أي مشكلة", isCorrect: true },
        {
          id: "b",
          text: "لا، يجب أن أستخدم نقاط الإرساء المحددة مسبقا و المتعمدة فقط",
          isCorrect: false,
        },
      ],
    },
    {
      title:
        "?عل يجب علي تسجيل تحليل الاخطار الخاص و المحين (HIRA LITE) قبل العمل على ارتفاع في منطقة محضوة؟",
      questionNumber: 7,
      imageUrl: r2q7,
      choice: [
        {
          id: "a",
          text: "نعم يجب أن أقوم بتحليل الاخطار الخاص و المحين و التأكد من َنني أفهم جميع المخاطر و الضوابد المقبلة للعمل بأمان",
          isCorrect: true,
        },
        { id: "b", text: "لا،هذا غير مطلوب", isCorrect: false },
      ],
    },
    {
      title: "هل يمكنني استخدام سقالة للعمل على ارتفاع؟",
      questionNumber: 8,
      imageUrl: r2q8,
      choice: [
        {
          id: "a",
          text: "نعم، ولكن فقط في حالة وجود علامة خضراء بتاريخ اليوم (كل يوم)",
          isCorrect: true,
        },
        {
          id: "b",
          text: "نعم، يمكنني استخدام السقالة، حتى إذا كان التاريخ ال يتطابق مع تاريخ اليوم",
          isCorrect: false,
        },
      ],
    },
    {
      title: "هل يمكنني الوصول إلى موقع مرتفع بحرية؟",
      questionNumber: 9,
      imageUrl: r2q9,
      choice: [
        { id: "a", text: "نعم، بدوي أي مشكلة", isCorrect: true },
        {
          id: "b",
          text: "لا، هذا غير مسموحبه، لأنني لست مجهزا بمعدات العمل الخاصة",
          isCorrect: false,
        },
      ],
    },
    {
      title:
        "عل يجب أن يتم فك حزام الامان عند العمل في منصة الرفع الشخصي / الرفع الذاتي؟",
      questionNumber: 10,
      imageUrl: r2q10,
      choice: [
        {
          id: "a",
          text: "يجب ربط حزام الامان فقط عندما تتحرك منصة الرفع الشخصي /المرتفعة ذاتيا ",
          isCorrect: true,
        },
        {
          id: "b",
          text: "يجب أن تكون دائما مرتبطا، طوال الوقت ",
          isCorrect: false,
        },
        {
          id: "c",
          text: "يجب أن أكون متصلا بحزام الامان، إلا إذا كنت بحاجة إلى الوصول إلى جهاز خارج السلة ",
          isCorrect: false,
        },
      ],
    },
    {
      title:
        "هل يمكنني حمل الأدوات و المواد في يدي عند استخدام السلالم أو السلم أو الدرج على المركبات  أو القاطرات؟",
      questionNumber: 11,
      imageUrl: r2q11,
      choice: [
        { id: "a", text: "نعم", isCorrect: true },
        {
          id: "b",
          text: "لا، يجب أن يكون لدي دائما 3 نقاد اتصال علي الأقل",
          isCorrect: false,
        },
      ],
    },
    {
      title:
        "عل يمكنني فصل الخاطف و الحبل بسرعة عند استخدام حبل أحادي لتغيير خد الأمان أو نقطة الإرساء؟",
      questionNumber: 12,
      imageUrl: r2q12,
      choice: [
        { id: "a", text: "نعم", isCorrect: true },
        {
          id: "b",
          text: "لا. أحتاج إلى حبل مزدوج ويجب أن أبقى متبتا دائما في نقطة تثبيت مناسبة",
          isCorrect: false,
        },
      ],
    },
    {
      title:
        "عندما أعمل فوق حفرة مفتوحة بعمق مترين أو بالقرب منها، أو عندما أقوم بإزالة حواجز شبكية أو ألواح تغطة، يجب أن  أكون مرتبطا بحزام الأمان؟",
      questionNumber: 13,
      imageUrl: r2q13,
      choice: [
        { id: "a", text: "نعم", isCorrect: true },
        { id: "b", text: "لا", isCorrect: false },
      ],
    },
    {
      title: "عل يمكنني استخدام سلم واحد للعمل على ارتفاع؟",
      questionNumber: 14,
      imageUrl: r2q14,
      choice: [
        {
          id: "a",
          text: "لا، ليس من المفترض أن يتم العمل من خلال سلم واحد بدلا من ذلك استخدم السلالم المحمولة أ غيرها من الوسائل التي توفر منصة أمنة،للعمل من خلالها",
          isCorrect: true,
        },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
  ],
  // regle 3
  [
    {
      title: "هل يتم احترام القاعدة الذ هبية لإنقاذ الحياة؟",
      questionNumber: 1,
      imageUrl: r3q1,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم، يتم احترام المتطلبات", isCorrect: false },
      ],
    },
    {
      title: "هل يتم احترام القاعدة الذ هبية لإنقاذ الحياة؟",
      questionNumber: 2,
      imageUrl: r3q2,
      choice: [
        { id: "a", text: "لا،لا يتم احترام الإجرأت", isCorrect: true },
        {
          id: "b",
          text: "LOTOTO  نعم، يتم اتباع جميع خطوات إجراء ",
          isCorrect: false,
        },
      ],
    },
    {
      title: "هل يتم احترام القاعدة الذ هبية لإنقاذ الحياة؟",
      questionNumber: 3,
      imageUrl: r3q3,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        {
          id: "b",
          text: "نعم، يتم احترام المراحل الثلاث للعملية",
          isCorrect: false,
        },
      ],
    },
    {
      title: "هل يتم احترام القاعدة الذ هبية لإنقاذ الحياة؟",
      questionNumber: 4,
      imageUrl: r3q4,
      choice: [
        { id: "a", text: "لا،لا يتم احترام القاعدة", isCorrect: true },
        { id: "b", text: "نعم يتم احترام القاعدة", isCorrect: false },
      ],
    },
  ],

  // regle 4
  [
    {
      title: "هل تمثل عذه الحالات خطرا على الأماكن الضيقة؟",
      questionNumber: 1,
      imageUrl: r4q1,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title:
        "لقد تم تكليفك بالعمل داخل مساحة ضيقة. أي من المستندات التالية تحتاج إليها؟",
      questionNumber: 2,
      imageUrl: r4q2,
      choice: [
        {
          id: "a",
          text: "وتيقة بعنوان شهادة التدريب في لأماكن الضيقة",
          isCorrect: true,
        },
        { id: "b", text: "وتيقة بعنوان تصريح عمل", isCorrect: false },
        { id: "c", text: "كلاهما", isCorrect: false },
      ],
    },
    {
      title: "عل يمكنك دخول المساحة الضيقة؟",
      questionNumber: 3,
      imageUrl: r4q3,
      choice: [
        { id: "a", text: "نعم", isCorrect: true },
        {
          id: "b",
          text: "لا، لأن صمام تهوية غير مغلق في وضع الفتح ولست مجهزا بحزام",
          isCorrect: false,
        },
      ],
    },
    {
      title: "ماذا يجب أن يفعل هؤلاء الناس؟",
      questionNumber: 4,
      imageUrl: r4q4,
      choice: [
        {
          id: "a",
          text: "نعم، تم فحص الغلاف الجوي من قبل رجل إطفاء قبل بدء العمل.لذلك، لا بأس، لا حاجة لأجهزة الكشف عن الغاز الفردية يمكنك إقاف تشغلها،فهي اختيرية",
          isCorrect: true,
        },
        {
          id: "b",
          text: "نعم، طالما أ زميلا واحدا على الأقل لديه محلل غاز شخصي قيد التشغيل و يعمل بشكل صحيح فهذا يكفي",
          isCorrect: false,
        },
        {
          id: "c",
          text: "لا،يجب على الشخص الذي لديه محلل الغاز المغق أو المعطل التوقف عن العمل ومغدرة المكان المحصور،أجهزة الكشف عن الغاز الفردية إلزامية و يجب أن تعمل دائما من لحضة دخولك إلى مكان ضيق",
          isCorrect: false,
        },
      ],
    },
    {
      title: "هل يمكنك البدء أو الاسمرار في العمل؟",
      questionNumber: 5,
      imageUrl: r4q5,
      choice: [
        {
          id: "a",
          text: "يجب علي الشخص الذي يصدر التصفير إعادة ضبط الكاشف الخاص به، فمن المحتمل أن يكون إندارا كاذبا",
          isCorrect: true,
        },
        {
          id: "b",
          text: "يجب أن يقترب الشخص الذي لديه كاشف أخضر من زميله للتحقق مما إدا كان الكاشف الخاص به يبدَ أيضا في إصدار صوت تنبيه",
          isCorrect: false,
        },
        {
          id: "c",
          text: "يجب أن يتوقف الشخص الذي لديه كاشف التصغير عن العمل، و يتحرك نحو زميله، و يعيد ضبط الكاشف ثم يعود إلى مهمته، فقط إذا بدَ جهازا الكشف الخاص به في إصدار صوت تنبيه مرة أخرى، يجب عليه التوقف وإخلاء المكان ",
          isCorrect: false,
        },
        {
          id: "d",
          text: "يجب علي كلاهما التوقف و الإخلاء. هناك خطأ ما، و يمكن أ يتدهور بسرعة كبيرة",
          isCorrect: false,
        },
      ],
    },
    {
      title: "ماذا يجب أن يفعل الحارس؟",
      questionNumber: 6,
      imageUrl: r4q6,
      choice: [
        { id: "a", text: "يجب أ يذهب لإنقاذ الشخص الجامد", isCorrect: true },
        {
          id: "b",
          text: "يمكنه الدخول جهاز الكشف عن الغاز، ويحاول إنقاذ الشخص",
          isCorrect: false,
        },
        {
          id: "c",
          text: "يجب ألا يخل المكان الضيق،الذي قد يكون ملوثا،ولكن يجب تنبيه خدمات لإنقاذ على الفور،يمكن فقط لأشخاص الذين لديهم أجهزة تنفسية مستقلة",
          isCorrect: false,
        },
      ],
    },
  ],
  // regle 5
  [
    {
      title: "عل يتم لحترام القاعدة الدهبية لإنقاد الحياة؟",
      questionNumber: 1,
      imageUrl: r5q1,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "عل يتم لحترام القاعدة الدهبية لإنقاد الحياة؟",
      questionNumber: 2,
      imageUrl: r5q2,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "عل يتم لحترام القاعدة الدهبية لإنقاد الحياة؟",
      questionNumber: 3,
      imageUrl: r5q3,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "عل يتم لحترام القاعدة الدهبية لإنقاد الحياة؟",
      questionNumber: 4,
      imageUrl: r5q4,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "عل يتم لحترام القاعدة الدهبية لإنقاد الحياة؟",
      questionNumber: 5,
      imageUrl: r5q5,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "عل يتم لحترام القاعدة الدهبية لإنقاد الحياة؟",
      questionNumber: 6,
      imageUrl: r5q6,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "هل يمكن تشغيل المصعد؟",
      questionNumber: 7,
      imageUrl: r5q7,
      choice: [
        {
          id: "a",
          text: "نعم، الحمولة لا تزال على الأرض و بالتالي فإن مخروط الأمان (المسافة) هو صفر",
          isCorrect: true,
        },
        {
          id: "b",
          text: "لا،الشخص الموجود علي الأرض قريب جدا، فهو بحاجة الابتعاد قبل أي حركة للرافعة",
          isCorrect: false,
        },
      ],
    },

    {
      title: "عل يمكنني اللقتراب من الحمولة التي وضعت للتو على الأرض؟",
      questionNumber: 8,
      imageUrl: r5q8,
      choice: [
        {
          id: "a",
          text: "نعم الحمولة موجودة بالفعل على الأرض، وبالتالي فإن مخرود الأمان (المسافة) هو صفر",
          isCorrect: true,
        },
        {
          id: "b",
          text: "لا،لا تزال الرافعات تحت اكصد، ويمكن أن تكسر أو لا يزال الحمل يتحرك بصكل غير متوقع",
          isCorrect: false,
        },
      ],
    },
    {
      title: "عل أحتاج إلى التدريب و الترخيص للقيام بأنشطة التلاعب؟",
      questionNumber: 9,
      imageUrl: r5q9,
      choice: [
        {
          id: "a",
          text: "لا، بالنسبة لأنشطة الرفع البسيطة، يمكن لأي شخص لديه حس سليم القيام بذلك",
          isCorrect: true,
        },
        {
          id: "b",
          text: "نعم",
          isCorrect: false,
        },
      ],
    },
  ],
  //regle 6
  [
    {
      title: "هل يتم احترام القاعدة الذهبية لإنقاد الحياة؟",
      questionNumber: 1,
      imageUrl: r6q1,
      choice: [
        { id: "a", text: "لا،لايتم احترام القاعدة", isCorrect: true },
        { id: "b", text: "نعم، يتم احترام القاعدة", isCorrect: false },
      ],
    },
    {
      title: "هل يتم احترام القاعدة الذهبية لإنقاد الحياة؟",
      questionNumber: 2,
      imageUrl: r6q2,
      choice: [
        { id: "a", text: "لا،لايتم احترام القاعدة", isCorrect: true },
        { id: "b", text: "نعم، يتم احترام القاعدة", isCorrect: false },
      ],
    },
    {
      title: "هل يتم احترام القاعدة الذهبية لإنقاد الحياة؟",
      questionNumber: 3,
      imageUrl: r6q3,
      choice: [
        { id: "a", text: "لا،لايتم احترام القاعدة", isCorrect: true },
        { id: "b", text: "نعم، يتم احترام القاعدة", isCorrect: false },
      ],
    },
    {
      title: "هل يتم احترام القاعدة الذهبية لإنقاد الحياة؟",
      questionNumber: 4,
      imageUrl: r6q4,
      choice: [
        { id: "a", text: "لا،لايتم احترام القاعدة", isCorrect: true },
        { id: "b", text: "نعم، يتم احترام القاعدة", isCorrect: false },
      ],
    },
    {
      title: "هل يتم احترام القاعدة الذهبية لإنقاد الحياة؟",
      questionNumber: 5,
      imageUrl: r6q5,
      choice: [
        {
          id: "a",
          text: "لا،لايتم احترام القاعدة،وليس هناك رؤية كافية",
          isCorrect: true,
        },
        { id: "b", text: "نعم، يتم احترام القاعدة", isCorrect: false },
      ],
    },
    {
      title: "هل السائق يحترم القاعدة الذهبية بخصوص وضعية الرافعة الشوكي؟",
      questionNumber: 6,
      imageUrl: r6q6,
      choice: [
        { id: "a", text: "لا،لايتم احترام القاعدة", isCorrect: true },
        { id: "b", text: "نعم، يتم احترام القاعدة", isCorrect: false },
      ],
    },
  ],
  //regle 7
  [
    {
      title: "هل تمثل هذه الوضعيات خطرا متعلقا بالسكك الحديدية؟",
      questionNumber: 1,
      imageUrl: r7q1,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },

    {
      title: "هل تمثل هذه الوضعيات خطرا متعلقا بالسكك الحديدية؟",
      questionNumber: 2,
      imageUrl: r7q2,
      choice: [
        {
          id: "a",
          text: "نعم أي معبر للسكك الحديدية يمتل خطرا على السكك الحديدية يتم التحكم المخاطر (الصطام أوالتدحرج) بشكل جيد نسبيا، لكن لا يزال قائما، لا يزال من الممكن وقوع حادث، حتى لو تقليل الحتمال بشكل كبير،  بسبب عناصر التحكم الهدسية، الخطر موجود،الخطر منخفض",
          isCorrect: true,
        },
        {
          id: "b",
          text: "لا، لقد أزلت الضوابط مخاطر السكك مخاطر السكك الحديدية(وبالتالي جميع المخاطر المرتبطة بها)",
          isCorrect: false,
        },
      ],
    },
    {
      title: "نعم، يتم احترام القاعدة",
      questionNumber: 3,
      imageUrl: r7q3,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "نعم، يتم احترام القاعدة",
      questionNumber: 4,
      imageUrl: r7q4,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "نعم، يتم احترام القاعدة",
      questionNumber: 5,
      imageUrl: r7q5,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "نعم، يتم احترام القاعدة",
      questionNumber: 6,
      imageUrl: r7q6,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "نعم، يتم احترام القاعدة",
      questionNumber: 7,
      imageUrl: r7q7,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
  ],

  [
    {
      title: "هل يمثل الرسم في بيئةأومساحة قريبة خطر الغاز أو خطر الانفجار؟",
      questionNumber: 1,
      imageUrl: r8q1,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "",
      questionNumber: 2,
      imageUrl: r8q2,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
        ,
      ],
    },
    {
      title: "",
      questionNumber: 2,
      imageUrl: r8q2,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
        ,
      ],
    },
    {
      title: "",
      questionNumber: 2,
      imageUrl: r8q2,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
        ,
      ],
    },
    {
      title: "",
      questionNumber: 3,
      imageUrl: r8q3,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
        ,
      ],
    },
    {
      title: "",
      questionNumber: 4,
      imageUrl: r8q4,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
        ,
      ],
    },
    {
      title: "",
      questionNumber: 5,
      imageUrl: r8q5,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
        ,
      ],
    },
    {
      title: "",
      questionNumber: 6,
      imageUrl: r8q6,
      choice: [
        { id: "a", text: "", isCorrect: true },
        { id: "b", text: "", isCorrect: false },
      ],
    },
  ],
  // {
  //   title: "",
  //   questionNumber: 1,
  //   imageUrl: r8q1,
  //   choice: [
  //     { id: "a", text: "", isCorrect: true },
  //     { id: "b", text: "", isCorrect: false },
  //   ],
  // },
];
