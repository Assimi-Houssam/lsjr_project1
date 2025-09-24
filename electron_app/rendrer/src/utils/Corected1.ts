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