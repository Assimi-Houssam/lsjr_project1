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
import r6q5 from "/src/assets/r6q5.png";
import r6q6 from "/src/assets/r6q6.png";
import r7q1 from "/src/assets/r7q1.png";
import r7q2 from "/src/assets/r7q2.png";
import r7q3 from "/src/assets/r7q3.png";
import r7q4 from "/src/assets/r7q4.png";
import r7q5 from "/src/assets/r7q5.png";
import r7q6 from "/src/assets/r7q6.png";
import r7q7 from "/src/assets/r7q7.png";
import r8q1 from "/src/assets/r8q1.png";
import r8q2 from "/src/assets/r8q2.png";
import r8q3 from "/src/assets/r8q3.png";
import r8q4 from "/src/assets/r8q4.png";
import r8q5 from "/src/assets/r8q5.png";
import r8q6 from "/src/assets/r8q6.png";
import r9q1 from "/src/assets/r9q1.png";
import r9q2 from "/src/assets/r9q2.png";
import r9q3 from "/src/assets/r9q3.png";
import r9q4 from "/src/assets/r9q4.png";
import r10q1 from "/src/assets/r10q1.png";
import r10q2 from "/src/assets/r10q2.png";
import r10q3 from "/src/assets/r10q3.png";
import r10q4 from "/src/assets/r10q4.png";
import r10q5 from "/src/assets/r10q5.png";
import r10q6 from "/src/assets/r10q6.png";

export const choices_ar = [
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
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
      ],
    },
    {
      title: "هل يجب أن يتحدث هذا الشخص عن الشعور بالعياء؟",
      questionNumber: 3,
      imageUrl: r1q3,
      choice: [
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
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
        { id: "a", text: "متر 1.5", isCorrect: false },
        { id: "b", text: "متر 1.8", isCorrect: true },
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
        { id: "a", text: "نعم، إذا انتبهت", isCorrect: false },
        {
          id: "b",
          text: "لا،أحتاج إلى الحصول على تصريه و تنفيد تحليل الاخطار و المحين",
          isCorrect: true,
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
        { id: "a", text: "نعم، بدون أي مشكلة", isCorrect: false },
        {
          id: "b",
          text: "لا، يجب أن أستخدم نقاط الإرساء المحددة مسبقا و المتعمدة فقط",
          isCorrect: true,
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
        { id: "a", text: "نعم، بدوي أي مشكلة", isCorrect: false },
        {
          id: "b",
          text: "لا، هذا غير مسموحبه، لأنني لست مجهزا بمعدات العمل الخاصة",
          isCorrect: true,
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
          isCorrect: false,
        },
        {
          id: "b",
          text: "يجب أن تكون دائما مرتبطا، طوال الوقت ",
          isCorrect: true,
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
        { id: "a", text: "نعم", isCorrect: false },
        {
          id: "b",
          text: "لا، يجب أن يكون لدي دائما 3 نقاد اتصال علي الأقل",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "عل يمكنني فصل الخاطف و الحبل بسرعة عند استخدام حبل أحادي لتغيير خد الأمان أو نقطة الإرساء؟",
      questionNumber: 12,
      imageUrl: r2q12,
      choice: [
        { id: "a", text: "نعم", isCorrect: false },
        {
          id: "b",
          text: "لا. أحتاج إلى حبل مزدوج ويجب أن أبقى متبتا دائما في نقطة تثبيت مناسبة",
          isCorrect: true,
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
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم، يتم احترام المتطلبات", isCorrect: true },
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
        { id: "a", text: "لا", isCorrect: false },
        {
          id: "b",
          text: "نعم، يتم احترام المراحل الثلاث للعملية",
          isCorrect: true,
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
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
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
          isCorrect: false,
        },
        { id: "b", text: "وتيقة بعنوان تصريح عمل", isCorrect: true },
        { id: "c", text: "كلاهما", isCorrect: false },
      ],
    },
    {
      title: "عل يمكنك دخول المساحة الضيقة؟",
      questionNumber: 3,
      imageUrl: r4q3,
      choice: [
        { id: "a", text: "نعم", isCorrect: false },
        {
          id: "b",
          text: "لا، لأن صمام تهوية غير مغلق في وضع الفتح ولست مجهزا بحزام",
          isCorrect: true,
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
          isCorrect: false,
        },
        {
          id: "b",
          text: "نعم، طالما أ زميلا واحدا على الأقل لديه محلل غاز شخصي قيد التشغيل و يعمل بشكل صحيح فهذا يكفي",
          isCorrect: false,
        },
        {
          id: "c",
          text: "لا،يجب على الشخص الذي لديه محلل الغاز المغق أو المعطل التوقف عن العمل ومغدرة المكان المحصور،أجهزة الكشف عن الغاز الفردية إلزامية و يجب أن تعمل دائما من لحضة دخولك إلى مكان ضيق",
          isCorrect: true,
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
          isCorrect: false,
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
          isCorrect: true,
        },
      ],
    },
    {
      title: "ماذا يجب أن يفعل الحارس؟",
      questionNumber: 6,
      imageUrl: r4q6,
      choice: [
        { id: "a", text: "يجب أ يذهب لإنقاذ الشخص الجامد", isCorrect: false },
        {
          id: "b",
          text: "يمكنه الدخول جهاز الكشف عن الغاز، ويحاول إنقاذ الشخص",
          isCorrect: false,
        },
        {
          id: "c",
          text: "يجب ألا يخل المكان الضيق،الذي قد يكون ملوثا،ولكن يجب تنبيه خدمات لإنقاذ على الفور،يمكن فقط لأشخاص الذين لديهم أجهزة تنفسية مستقلة",
          isCorrect: true,
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
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
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
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
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
          isCorrect: false,
        },
        {
          id: "b",
          text: "لا،الشخص الموجود علي الأرض قريب جدا، فهو بحاجة الابتعاد قبل أي حركة للرافعة",
          isCorrect: true,
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
          isCorrect: false,
        },
        {
          id: "b",
          text: "لا،لا تزال الرافعات تحت اكصد، ويمكن أن تكسر أو لا يزال الحمل يتحرك بصكل غير متوقع",
          isCorrect: true,
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
          isCorrect: false,
        },
        {
          id: "b",
          text: "نعم",
          isCorrect: true,
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
        { id: "a", text: "لا،لايتم احترام القاعدة", isCorrect: false },
        { id: "b", text: "نعم، يتم احترام القاعدة", isCorrect: true },
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
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
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
      title: "هل، يتم احترام القاعدة",
      questionNumber: 3,
      imageUrl: r7q3,
      choice: [
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
      ],
    },
    {
      title: "هل، يتم احترام القاعدة",
      questionNumber: 4,
      imageUrl: r7q4,
      choice: [
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
      ],
    },
    {
      title: "هل، يتم احترام القاعدة",
      questionNumber: 5,
      imageUrl: r7q5,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
      ],
    },
    {
      title: "هل، يتم احترام القاعدة",
      questionNumber: 6,
      imageUrl: r7q6,
      choice: [
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
      ],
    },
    {
      title: "هل، يتم احترام القاعدة",
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
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
      ],
    },
    {
      title:
        "هل يمثل هذا الموقف خطر الغاز أو خطر الانفجار؟ موقع تحويل الغاز وتخزينه",
      questionNumber: 2,
      imageUrl: r8q2,
      choice: [
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
        ,
      ],
    },
    {
      title:
        "هل يمثل هذا الموقف خطر الغاز أو خطر الانفجار؟ (موقع تحويل الوقود وتخزينه",
      questionNumber: 3,
      imageUrl: r8q3,
      choice: [
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
        ,
      ],
    },
    {
      title:
        "هل يمثل هذا الموقف خطر الغاز أو خطر الانفجار؟ (وحدة إنتاج الأكسجين)",
      questionNumber: 4,
      imageUrl: r8q4,
      choice: [
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
        ,
      ],
    },
    {
      title:
        "هل يمثل استخدام مذيب في بيئة أو مساحة مغلقة خطر الغاز أو خطر الانفجار؟",
      questionNumber: 5,
      imageUrl: r8q5,
      choice: [
        { id: "a", text: "لا", isCorrect: false },
        { id: "b", text: "نعم", isCorrect: true },
        ,
      ],
    },
    {
      title:
        "هل يمكن للشخص المجهز بجهاز التنفس الصناعي المستقل الدخول إلى منطقة الغاز الخطير؟",
      questionNumber: 6,
      imageUrl: r8q6,
      choice: [
        { id: "a", text: "لا", isCorrect: true },
        { id: "b", text: "نعم", isCorrect: false },
        ,
      ],
    },
    {
      title: "هل يمكنني أنا وزملائي بدء العمل أو الاستمرار فيه؟",
      questionNumber: 5,
      imageUrl: r8q5,
      choice: [
        {
          id: "a",
          text: "نعم، تم فحص الغلاف الجوي من قبل رجل إطفاء قبل بدء العمل، لذلك لا بأس، لا حاجة لكاشف الغاز الفردي. يمكنك إيقاف تشغيله، إنه اختياري",
          isCorrect: false,
        },
        {
          id: "b",
          text: "نعم، طالما أن أحد الزملاء لديه على الأقل محلل غاز شخصي يعمل بشكل صحيح ويتم تشغيله، فهذا يكفي",
          isCorrect: false,
        },
        {
          id: "c",
          text: "لا، يجب على الشخص الذي لديه محلل الغاز المغلق أو المعطل إيقاف العمل والخروج من المكان الضيق؛ أجهزة الكشف عن الغاز الفردية إلزامية ويجب أن تعمل طوال الوقت بمجرد أن تعمل داخل مكان ضيق",
          isCorrect: true,
        },
        ,
      ],
    },
    {
      title: "ماذا يجب أن أفعل أنا وزميلي؟",
      questionNumber: 6,
      imageUrl: r8q6,
      choice: [
        {
          id: "a",
          text: "محلل الزميل يصدر صوتا، لذا يجب عليه إعادة ضبط كاشفه، ربما إنذار خاطئ",
          isCorrect: false,
        },
        {
          id: "b",
          text: "نبقى قريبين من بعضنا البعض للتحقق مما إذا كان الكاشف الخاص بي يبدأ أيضا في إصدار صوت تنبيه",
          isCorrect: false,
        },
        {
          id: "c",
          text: "يجب على زميلي التوقف عن العمل والابتعاد نحوي، ثم إعادة ضبط الكاشف الخاص به، ثم العودة إلى مهمته فقط إذا بدأ الصوت في التصفير مرة أخرى، فعليه التوقف وإخلاء المكان",
          isCorrect: false,
        },
        {
          id: "d",
          text: "يجب على كلينا التوقف والإخلاء. هناك خطأ ما، ويمكن أن يتدهور بسرعة كبيرة",
          isCorrect: true,
        },
      ],
    },
  ],
  [
    {
      title:
        "إذا اضطررت للتدخل هل يمكنني إزالة الحماية السياج، الغطاء،... إلخ) ؟",
      questionNumber: 1,
      imageUrl: r9q1,
      choice: [
        {
          id: "a",
          text: "، نعم، دون أي مشكلة، لأنني ماهر بما يكفي لتجنب الإصابة",
          isCorrect: false,
        },
        {
          id: "b",
          text: "نعم، إذا كان لدي تفويض من المشرف الخاص بي",
          isCorrect: false,
        },
        {
          id: "c",
          text: ". وقمت بوضع القفل على قاطع الدائرة الكهربائية أو صندوق القفل (العزل)LOTOTO نعم، إذا تم تطبييق",
          isCorrect: false,
        },
        {
          id: "d",
          text: ".HIRA Lite محدد بمشاركة خبراء محليين وتم الالتزام بجميع عناصر التحكم الموضحة في HIRA Lite نعم، إذا تم إجراء اختبار",
          isCorrect: false,
        },
        {
          id: "f",
          text: "فقط، إذا كانت العبارتان الأخيرتان السابقتان صحيحتين",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "هل أحتاج إلى إعادة الحماية (الغطاء، السياج .... إلخ) بمجرد الانتهاء من أعمال الإصلاح الخاصة بي على الجهاز؟",
      questionNumber: 2,
      imageUrl: r9q2,
      choice: [
        { id: "a", text: "نعم، دائما", isCorrect: true },
        { id: "b", text: "لاء سيتم ذلك من قبل مديري", isCorrect: false },
        {
          id: "c",
          text: "زميلي من المناوبة التالية سيعيدها",
          isCorrect: false,
        },
      ],
    },
    {
      title: "أرى غطاء/حماية مفقودة أو مفككة على المعدات قيد التشغيل",
      questionNumber: 3,
      imageUrl: r9q3,
      choice: [
        { id: "a", text: "لا يهمني، هذا ليس واجبي", isCorrect: false },
        { id: "b", text: "سأبلغ المدير المشرف على الفور", isCorrect: true },
      ],
    },
    {
      title:
        "هل يمكنني استخدام إيقاف الطوارئ (الزر الخط) لإيقاف الإنتاج واستخدامه ؟",
      questionNumber: 4,
      imageUrl: r9q4,
      choice: [
        { id: "a", text: "نعم، يكفي العمل بأمان", isCorrect: false },
        {
          id: "b",
          text: "لا، أبدا، الغرض الوحيد منه هو حالات الطوارئ",
          isCorrect: true,
        },
      ],
    },
  ],
  [
    {
      title: "إذا كنت سأقوم بنشاط",
      questionNumber: 1,
      imageUrl: r10q1,
      choice: [
        {
          id: "a",
          text: "أحتاج فقط إلى تعليمات شفهية لأنني أعرف وأستطيع القيام بهذه المهمة",
          isCorrect: false,
        },
        {
          id: "b",
          text: "لفهم المخاطر التي ينطوي عليها النشاط وتطبيق الضوابط اللازمة HIRA Lite و SOP قبل أن أبدا المهمه، أحتاج إلى مراجعة",
          isCorrect: true,
        },
      ],
    },
    {
      title: "...عندما تكون هناك حاجة إلى تصريح عمل",
      questionNumber: 2,
      imageUrl: r10q2,
      choice: [
        {
          id: "a",
          text: "أذهب إلى مكتب المشرف الخاص بي، وهو يوقع تصريح العمل الذي أحتاجه",
          isCorrect: false,
        },
        {
          id: "b",
          text: "قبل بدء العمل، يقوم الفريق المعني بالمشرف بإجراء تقييم مفصل للمخاطر، والتأكد من مراجعة تصريح العمل، والتأكد من أن جميع الضوابط موجوده، والتأكد من أن تصريح العمل مصرح به في الموقع حيث سيتم تنفيذ العمل HIRA التي تم النظر فيها في",
          isCorrect: true,
        },
      ],
    },
    {
      title: "إذا كان هناك شيء غير واضح قبل النشاط أو أثناءه...",
      questionNumber: 3,
      imageUrl: r10q3,
      choice: [
        {
          id: "a",
          text: " أستخدم خبرتي السابقة وأواصل العمل، لأن المهمة تحتاج إلى إنجاز",
          isCorrect: false,
        },
        {
          id: "b",
          text: "أواصل العمل لأن لدي بالفعل خطة سابقة",
          isCorrect: false,
        },
        {
          id: "c",
          text: "وتعديل الضوابط للتخفيف من المخاطر الجديدة المحددة. إذا لزم الأمر، أطلب من ، HIRA Lite) أقوم بإيقاف النشاط وإعادة تقييم المخاطر (HIRA Lite) وتعديل الضوابط للتخفيف من المخاطر الجديدة المحددة. إذا لزم الأمر، أطلب من المشرف اتخاذ القرار الأفضل",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "عندما يكون نشاطا حرجًا، أتواصل بوضوح وأستخدم الاتصال ثلاثي الاتجاهات",
      questionNumber: 4,
      imageUrl: r10q4,
      choice: [
        {
          id: "a",
          text: "إذا كنت سأقوم بمناورة باستخدام رافعة، فأنا ببساطة أشير إلى مشغل الرافعة للإشارة إلى الإجراء الذي يجب اتخلاه، مع التأكد من أنه تبعني",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Crane إذا كنت سأشير إلى مشغل رافعة لإجراء مناوره، فإنني أستخدم الاتصال ثلاثي الاتجاه، على سبيل المثال أنا، «اقلب الطفره إلى اليمين»؛ . هل تريد مني تحويل الطفرة إلى اليمين؟» ؛ أنا: «نعم، هذا صحيح، أدر الطفره إلى اليمين» :.Op",
          isCorrect: true,
        },
      ],
    },
    {
      title: "هل تم ممارسة قاعدة اليقظة المشتركة؟",
      questionNumber: 5,
      imageUrl: r10q5,
      choice: [
        {
          id: "a",
          text: "نعم، كم الامتثال للقاعدة وتم تحديد جميع المخاطر وتقييم جميع المخاطر في البيئة",
          isCorrect: false,
        },
        {
          id: "b",
          text: "لا، لا يتم اتباع القاعدة، ولا أحد يطبق اليقظة المشتركة",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "...عندما ألاحظ أن زميلا في العمل يكسر القاعدة الذهبية التي تنقذ الأرواح ",
      questionNumber: 6,
      imageUrl: r10q6,
      choice: [
        {
          id: "a",
          text: "أتجاهله ، فهو يعرف المخاطر والعواقب",
          isCorrect: false,
        },
        {
          id: "b",
          text: ". أكمل أنشطتي وإذا كان لدي الوقت لاحقا، أذهب إلى مشرفه لإبلاغه",
          isCorrect: false,
        },
        {
          id: "c",
          text: "أوقف النشاط فورا وأتحدث إلى الجاني لتوعيته بالمخاطر والتصرف أو اتخاذ إجراء",
          isCorrect: true,
        },
      ],
    },
  ],
];

export const choices_fr = [
  // règle 1
  [
    {
      title: "Faut-il permettre à la personne d'entrer sur le site ?",
      questionNumber: 1,
      imageUrl: r1q1,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
    {
      title: "Cette personne doit-elle consulter son médecin du travail ?",
      questionNumber: 2,
      imageUrl: r1q2,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title: "La personne doit-elle signaler qu'elle se sent mal ?",
      questionNumber: 3,
      imageUrl: r1q3,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 4,
      imageUrl: r1q4,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
  ],
  // règle 2
  [
    {
      title:
        "À partir de quelle hauteur considère-t-on un travail en hauteur ?",
      questionNumber: 1,
      imageUrl: r2q1,
      choice: [
        { id: "a", text: "1,5 mètre", isCorrect: false },
        { id: "b", text: "1,8 mètre", isCorrect: true },
        { id: "c", text: "2,0 mètres", isCorrect: false },
        { id: "d", text: "3,0 mètres", isCorrect: false },
      ],
    },
    {
      title:
        "Est-il nécessaire de porter un casque avec jugulaire bien réglée en travail en hauteur ?",
      questionNumber: 2,
      imageUrl: r2q2,
      choice: [
        { id: "a", text: "Oui, c'est obligatoire", isCorrect: true },
        { id: "b", text: "Non, ce n'est pas obligatoire", isCorrect: false },
        { id: "c", text: "Je peux décider librement", isCorrect: false },
      ],
    },
    {
      title:
        "Puis-je accéder librement à l'élément pour effectuer le travail ?",
      questionNumber: 3,
      imageUrl: r2q3,
      choice: [
        { id: "a", text: "Oui, si je fais attention", isCorrect: false },
        {
          id: "b",
          text: "Non, je dois obtenir une autorisation et réaliser une analyse des risques (HIRA)",
          isCorrect: true,
        },
      ],
    },
    {
      title: "À quelle fréquence doit-on inspecter l'état du harnais ?",
      questionNumber: 4,
      imageUrl: r2q4,
      choice: [
        { id: "a", text: "Quotidiennement", isCorrect: true },
        { id: "b", text: "Hebdomadairement", isCorrect: false },
        { id: "c", text: "Avant chaque utilisation", isCorrect: false },
      ],
    },
    {
      title:
        "Dois-je porter un harnais lorsque je travaille en hauteur dans une zone confinée ?",
      questionNumber: 5,
      imageUrl: r2q5,
      choice: [
        {
          id: "a",
          text: "Oui, il doit être porté et relié à 100% du temps aux points d'ancrage définis par un professionnel",
          isCorrect: true,
        },
        {
          id: "b",
          text: "Oui, mais je peux le détacher brièvement si inconfortable",
          isCorrect: false,
        },
      ],
    },
    {
      title: "Puis-je décider moi-même du point d'ancrage pour mon câble ?",
      questionNumber: 6,
      imageUrl: r2q6,
      choice: [
        { id: "a", text: "Oui, sans problème", isCorrect: false },
        {
          id: "b",
          text: "Non, je dois utiliser seulement les points d'ancrage autorisés",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Dois-je enregistrer mon analyse des risques spécifique et actuelle (HIRA Lite) avant de travailler en hauteur ?",
      questionNumber: 7,
      imageUrl: r2q7,
      choice: [
        {
          id: "a",
          text: "Oui, je dois réaliser l'HIRA et comprendre tous les risques et contrôles",
          isCorrect: true,
        },
        { id: "b", text: "Non, ce n'est pas requis", isCorrect: false },
      ],
    },
    {
      title: "Puis-je utiliser un échafaudage pour travailler en hauteur ?",
      questionNumber: 8,
      imageUrl: r2q8,
      choice: [
        {
          id: "a",
          text: "Oui, mais seulement si une étiquette verte datée du jour est présente",
          isCorrect: true,
        },
        {
          id: "b",
          text: "Oui, même si la date n'est pas la date du jour",
          isCorrect: false,
        },
      ],
    },
    {
      title: "Puis-je accéder librement à un site élevé ?",
      questionNumber: 9,
      imageUrl: r2q9,
      choice: [
        { id: "a", text: "Oui, sans problème", isCorrect: false },
        {
          id: "b",
          text: "Non, je ne suis pas équipé du matériel nécessaire",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Faut-il détacher le harnais lors de l'utilisation d'une nacelle élévatrice/personnelle ?",
      questionNumber: 10,
      imageUrl: r2q10,
      choice: [
        {
          id: "a",
          text: "Il faut attacher le harnais seulement lorsque la nacelle se déplace",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Vous devez être toujours attaché, tout le temps",
          isCorrect: true,
        },
        {
          id: "c",
          text: "Je dois être relié sauf si j'atteins un équipement en dehors de la plate-forme",
          isCorrect: false,
        },
      ],
    },
    {
      title:
        "Puis-je porter des outils à la main en montant des échelles ou des escaliers sur véhicules ou remorques ?",
      questionNumber: 11,
      imageUrl: r2q11,
      choice: [
        { id: "a", text: "Oui", isCorrect: false },
        {
          id: "b",
          text: "Non, je dois toujours avoir au moins 3 points de contact",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Puis-je enlever rapidement un mousqueton ou une longe quand j'utilise une seule corde pour changer de point d'ancrage ?",
      questionNumber: 12,
      imageUrl: r2q12,
      choice: [
        { id: "a", text: "Oui", isCorrect: false },
        {
          id: "b",
          text: "Non, j'ai besoin d'une double longe et je dois rester attaché en permanence",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Dois-je être relié par harnais lorsque je travaille au-dessus ou près d'une trappe ouverte de 2 mètres de profondeur ?",
      questionNumber: 13,
      imageUrl: r2q13,
      choice: [
        { id: "a", text: "Oui", isCorrect: true },
        { id: "b", text: "Non", isCorrect: false },
      ],
    },
    {
      title: "Peut-on travailler depuis une simple échelle ?",
      questionNumber: 14,
      imageUrl: r2q14,
      choice: [
        {
          id: "a",
          text: "Non, il ne faut pas travailler depuis une échelle simple ; utiliser des moyens offrant une plate-forme sûre",
          isCorrect: true,
        },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
  ],
  // règle 3
  [
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 1,
      imageUrl: r3q1,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        {
          id: "b",
          text: "Oui, les exigences sont respectées",
          isCorrect: true,
        },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 2,
      imageUrl: r3q2,
      choice: [
        {
          id: "a",
          text: "Non, les procédures ne sont pas respectées",
          isCorrect: true,
        },
        {
          id: "b",
          text: "LOTOTO : oui, toutes les étapes sont suivies",
          isCorrect: false,
        },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 3,
      imageUrl: r3q3,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        {
          id: "b",
          text: "Oui, les trois étapes du processus sont respectées",
          isCorrect: true,
        },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 4,
      imageUrl: r3q4,
      choice: [
        { id: "a", text: "Non, la règle n'est pas respectée", isCorrect: true },
        { id: "b", text: "Oui, la règle est respectée", isCorrect: false },
      ],
    },
  ],

  // règle 4
  [
    {
      title:
        "Ces situations représentent-elles un danger pour les espaces confinés ?",
      questionNumber: 1,
      imageUrl: r4q1,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title:
        "Si vous êtes chargé de travailler dans un espace confiné, quels documents avez-vous besoin ?",
      questionNumber: 2,
      imageUrl: r4q2,
      choice: [
        {
          id: "a",
          text: "Un certificat de formation aux espaces confinés",
          isCorrect: false,
        },
        { id: "b", text: "Un permis de travail", isCorrect: true },
        { id: "c", text: "Les deux", isCorrect: false },
      ],
    },
    {
      title: "Pouvez-vous entrer dans l'espace confiné ?",
      questionNumber: 3,
      imageUrl: r4q3,
      choice: [
        { id: "a", text: "Oui", isCorrect: false },
        {
          id: "b",
          text: "Non, la vanne de ventilation est ouverte et je ne suis pas équipé d'un harnais",
          isCorrect: true,
        },
      ],
    },
    {
      title: "Que doivent faire ces personnes ?",
      questionNumber: 4,
      imageUrl: r4q4,
      choice: [
        {
          id: "a",
          text: "Oui, l'atmosphère a été testée par les pompiers, donc pas besoin de détecteurs personnels, ils sont optionnels",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Oui, tant qu'au moins un collègue a un analyseur de gaz personnel en fonctionnement, c'est suffisant",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Non, la personne dont l'analyseur est éteint ou défectueux doit arrêter le travail et quitter l'espace confiné ; les détecteurs personnels sont obligatoires et doivent fonctionner en permanence",
          isCorrect: true,
        },
      ],
    },
    {
      title: "Pouvez-vous commencer ou continuer le travail ?",
      questionNumber: 5,
      imageUrl: r4q5,
      choice: [
        {
          id: "a",
          text: "La personne qui entend l'alarme doit réinitialiser son détecteur, c'est probablement une fausse alerte",
          isCorrect: false,
        },
        {
          id: "b",
          text: "La personne avec le détecteur vert doit se rapprocher pour vérifier si le détecteur de son collègue sonne aussi",
          isCorrect: false,
        },
        {
          id: "c",
          text: "La personne dont le détecteur sonne doit arrêter le travail, se rapprocher de son collègue, réinitialiser son détecteur puis revenir à la tâche ; si l'alarme revient, quitter la zone",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Les deux doivent s'arrêter et évacuer. Il y a un problème qui peut se détériorer rapidement",
          isCorrect: true,
        },
      ],
    },
    {
      title: "Que doit faire le surveillant ?",
      questionNumber: 6,
      imageUrl: r4q6,
      choice: [
        {
          id: "a",
          text: "Il doit aller sauver la personne inconsciente",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Il peut entrer avec un détecteur de gaz et tenter un sauvetage",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Il ne doit pas entrer dans l'espace confiné potentiellement contaminé ; il doit alerter immédiatement les services de secours, seuls des intervenants équipés d'appareils respiratoires autonomes peuvent entrer",
          isCorrect: true,
        },
      ],
    },
  ],

  // règle 5
  [
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 1,
      imageUrl: r5q1,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 2,
      imageUrl: r5q2,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 3,
      imageUrl: r5q3,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 4,
      imageUrl: r5q4,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 5,
      imageUrl: r5q5,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 6,
      imageUrl: r5q6,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
    {
      title: "Peut-on actionner la grue ?",
      questionNumber: 7,
      imageUrl: r5q7,
      choice: [
        {
          id: "a",
          text: "Oui, la charge est encore au sol donc le cône de sécurité est nul",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Non, la personne au sol est trop proche et doit s'éloigner avant tout mouvement de la grue",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Puis-je m'approcher d'une charge qui vient d'être déposée au sol ?",
      questionNumber: 8,
      imageUrl: r5q8,
      choice: [
        {
          id: "a",
          text: "Oui, la charge est au sol donc la zone de sécurité est nulle",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Non, la grue peut encore bouger ou la charge peut se déplacer de façon imprévisible",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Ai-je besoin de formation et d'une autorisation pour effectuer des opérations de levage ?",
      questionNumber: 9,
      imageUrl: r5q9,
      choice: [
        {
          id: "a",
          text: "Non, pour des opérations simples n'importe qui peut le faire",
          isCorrect: false,
        },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
  ],

  // règle 6
  [
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 1,
      imageUrl: r6q1,
      choice: [
        { id: "a", text: "Non, la règle n'est pas respectée", isCorrect: true },
        { id: "b", text: "Oui, la règle est respectée", isCorrect: false },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 2,
      imageUrl: r6q2,
      choice: [
        { id: "a", text: "Non, la règle n'est pas respectée", isCorrect: true },
        { id: "b", text: "Oui, la règle est respectée", isCorrect: false },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 3,
      imageUrl: r6q3,
      choice: [
        { id: "a", text: "Non, la règle n'est pas respectée", isCorrect: true },
        { id: "b", text: "Oui, la règle est respectée", isCorrect: false },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 4,
      imageUrl: r6q4,
      choice: [
        { id: "a", text: "Non, la règle n'est pas respectée", isCorrect: true },
        { id: "b", text: "Oui, la règle est respectée", isCorrect: false },
      ],
    },
    {
      title: "La règle d'or pour sauver des vies est-elle respectée ?",
      questionNumber: 5,
      imageUrl: r6q5,
      choice: [
        {
          id: "a",
          text: "Non, la règle n'est pas respectée et la visibilité est insuffisante",
          isCorrect: true,
        },
        { id: "b", text: "Oui, la règle est respectée", isCorrect: false },
      ],
    },
    {
      title:
        "Le conducteur respecte-t-il la règle d'or concernant la position du chariot élévateur ?",
      questionNumber: 6,
      imageUrl: r6q6,
      choice: [
        {
          id: "a",
          text: "Non, la règle n'est pas respectée",
          isCorrect: false,
        },
        { id: "b", text: "Oui, la règle est respectée", isCorrect: true },
      ],
    },
  ],

  // règle 7
  [
    {
      title:
        "Ces situations représentent-elles un danger lié aux voies ferrées ?",
      questionNumber: 1,
      imageUrl: r7q1,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title:
        "Ces situations représentent-elles un danger lié aux voies ferrées ?",
      questionNumber: 2,
      imageUrl: r7q2,
      choice: [
        {
          id: "a",
          text: "Oui, un passage à niveau reste un risque contrôlé mais le danger existe encore (faible)",
          isCorrect: true,
        },
        {
          id: "b",
          text: "Non, les contrôles ont totalement éliminé les risques ferroviaires",
          isCorrect: false,
        },
      ],
    },
    {
      title: "La règle est-elle respectée ?",
      questionNumber: 3,
      imageUrl: r7q3,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title: "La règle est-elle respectée ?",
      questionNumber: 4,
      imageUrl: r7q4,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title: "La règle est-elle respectée ?",
      questionNumber: 5,
      imageUrl: r7q5,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
    {
      title: "La règle est-elle respectée ?",
      questionNumber: 6,
      imageUrl: r7q6,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title: "La règle est-elle respectée ?",
      questionNumber: 7,
      imageUrl: r7q7,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
  ],

  // règles 8
  [
    {
      title:
        "Le dessin dans cet environnement ou espace proche représente-t-il un risque de gaz ou d'explosion ?",
      questionNumber: 1,
      imageUrl: r8q1,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title:
        "Cette situation présente-t-elle un risque de gaz ou d'explosion ? (site de conversion et stockage de gaz)",
      questionNumber: 2,
      imageUrl: r8q2,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title:
        "Cette situation présente-t-elle un risque de gaz ou d'explosion ? (site de conversion et stockage de carburant)",
      questionNumber: 3,
      imageUrl: r8q3,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title:
        "Cette situation représente-t-elle un risque de gaz ou d'explosion ? (unité de production d'oxygène)",
      questionNumber: 4,
      imageUrl: r8q4,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title:
        "L'utilisation d'un solvant dans un espace clos représente-t-elle un risque de gaz ou d'explosion ?",
      questionNumber: 5,
      imageUrl: r8q5,
      choice: [
        { id: "a", text: "Non", isCorrect: false },
        { id: "b", text: "Oui", isCorrect: true },
      ],
    },
    {
      title:
        "Une personne équipée d'un appareil respiratoire autonome peut-elle entrer en zone à gaz dangereux ?",
      questionNumber: 6,
      imageUrl: r8q6,
      choice: [
        { id: "a", text: "Non", isCorrect: true },
        { id: "b", text: "Oui", isCorrect: false },
      ],
    },
    {
      title: "Pouvons-nous commencer ou continuer le travail ?",
      questionNumber: 5,
      imageUrl: r8q5,
      choice: [
        {
          id: "a",
          text: "Oui, l'atmosphère a été vérifiée par les pompiers, donc pas besoin de détecteurs personnels",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Oui, tant qu'au moins un collègue a un analyseur de gaz personnel en fonctionnement",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Non, la personne dont l'analyseur est éteint ou défectueux doit arrêter le travail et quitter l'espace ; les détecteurs personnels sont obligatoires et doivent fonctionner en permanence",
          isCorrect: true,
        },
      ],
    },
    {
      title: "Que devons-nous faire, mon collègue et moi ?",
      questionNumber: 6,
      imageUrl: r8q6,
      choice: [
        {
          id: "a",
          text: "Le détecteur du collègue sonne, il doit le réinitialiser car c'est peut-être une fausse alerte",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Rester proches pour vérifier si mon détecteur se met aussi à sonner",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Le collègue doit arrêter le travail, s'éloigner, réinitialiser son détecteur et ne revenir que si l'alarme ne se réactive pas ; sinon évacuer",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Nous devons tous les deux arrêter et évacuer. Il y a un problème qui peut s'aggraver vite",
          isCorrect: true,
        },
      ],
    },
  ],

  // règle 9
  [
    {
      title:
        "Si je dois intervenir, puis-je retirer la protection (grillage, couverture, etc.) ?",
      questionNumber: 1,
      imageUrl: r9q1,
      choice: [
        {
          id: "a",
          text: "Oui, sans problème, car je suis suffisamment compétent",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Oui, si j'ai une délégation de mon superviseur",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Oui, si j'ai mis un verrou sur l'interrupteur ou dans la boîte de consignation (LOTOTO)",
          isCorrect: false,
        },
        {
          id: "d",
          text: "Oui, si le HIRA Lite a été réalisé avec des experts locaux et que tous les contrôles sont en place",
          isCorrect: false,
        },
        {
          id: "f",
          text: "Seulement si les deux dernières conditions sont remplies",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Dois-je remettre la protection (capot, garde, etc.) une fois ma réparation terminée ?",
      questionNumber: 2,
      imageUrl: r9q2,
      choice: [
        { id: "a", text: "Oui, toujours", isCorrect: true },
        {
          id: "b",
          text: "Non, ce sera fait par mon superviseur",
          isCorrect: false,
        },
        {
          id: "c",
          text: "Mon collègue de la prochaine équipe le remettra",
          isCorrect: false,
        },
      ],
    },
    {
      title:
        "Je vois une protection/une couverture manquante ou desserrée sur un équipement en fonctionnement",
      questionNumber: 3,
      imageUrl: r9q3,
      choice: [
        {
          id: "a",
          text: "Je m'en fiche, ce n'est pas mon travail",
          isCorrect: false,
        },
        {
          id: "b",
          text: "J'en informe immédiatement le superviseur responsable",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Puis-je utiliser l'arrêt d'urgence (bouton rouge) pour arrêter la production et l'utiliser ?",
      questionNumber: 4,
      imageUrl: r9q4,
      choice: [
        {
          id: "a",
          text: "Oui, c'est suffisant pour travailler en sécurité",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Non, jamais, il est réservé aux situations d'urgence",
          isCorrect: true,
        },
      ],
    },
  ],

  // règle 10
  [
    {
      title: "Si je vais effectuer une activité...",
      questionNumber: 1,
      imageUrl: r10q1,
      choice: [
        {
          id: "a",
          text: "J'ai seulement besoin d'instructions orales car je sais faire la tâche",
          isCorrect: false,
        },
        {
          id: "b",
          text: "J'ai besoin de revoir le HIRA Lite et la SOP pour comprendre les risques et appliquer les contrôles avant de commencer",
          isCorrect: true,
        },
      ],
    },
    {
      title: "...quand un permis de travail est nécessaire",
      questionNumber: 2,
      imageUrl: r10q2,
      choice: [
        {
          id: "a",
          text: "Je vais au bureau du superviseur et il signe le permis",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Avant le travail, l'équipe de supervision réalise une évaluation détaillée des risques, révise le permis et s'assure que tous les contrôles sont en place",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "S'il y a quelque chose d'incertain avant ou pendant l'activité...",
      questionNumber: 3,
      imageUrl: r10q3,
      choice: [
        {
          id: "a",
          text: "J'utilise mon expérience précédente et je continue",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Je continue parce que j'ai déjà un plan antérieur",
          isCorrect: false,
        },
        {
          id: "c",
          text: "J'arrête l'activité si nécessaire, je réévalue les risques (HIRA Lite) et j'ajuste les contrôles ; si besoin, je demande au superviseur de décider",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "Lors d'une activité critique, je communique clairement en utilisant la communication en trois sens",
      questionNumber: 4,
      imageUrl: r10q4,
      choice: [
        {
          id: "a",
          text: "Si je dirige une manœuvre de grue, je fais simplement un geste au conducteur en m'assurant qu'il me suit",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Si je dirige une manœuvre de grue, j'utilise la communication en trois sens (par ex. : 'Tournez le bras à droite' ; 'Pouvez-vous tourner le bras à droite ?' ; 'Oui, tournez à droite')",
          isCorrect: true,
        },
      ],
    },
    {
      title: "La règle de vigilance partagée est-elle pratiquée ?",
      questionNumber: 5,
      imageUrl: r10q5,
      choice: [
        {
          id: "a",
          text: "Oui, la conformité à la règle est bonne et tous les risques sont identifiés",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Non, la règle n'est pas suivie et personne ne pratique la vigilance partagée",
          isCorrect: true,
        },
      ],
    },
    {
      title:
        "...lorsque je remarque qu'un collègue enfreint la règle d'or qui sauve des vies",
      questionNumber: 6,
      imageUrl: r10q6,
      choice: [
        {
          id: "a",
          text: "Je l'ignore, il connaît les risques",
          isCorrect: false,
        },
        {
          id: "b",
          text: "Je continue mes tâches et j'en parlerai plus tard si j'ai le temps",
          isCorrect: false,
        },
        {
          id: "c",
          text: "J'arrête l'activité immédiatement et j'interviens ou j'en informe pour corriger le comportement",
          isCorrect: true,
        },
      ],
    },
  ],
];
