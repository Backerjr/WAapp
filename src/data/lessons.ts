import { Unit } from '../types';

export const skillTree: Unit[] = [
  {
    id: 'unit-1',
    title_pl: 'Podstawy',
    title_en: 'Basics',
    cefr: 'A0',
    description_pl: 'Każde słowo to kamień w moście porozumienia.',
    description_en: 'Every word is a stone in the bridge of understanding.',
    lessons: [
      {
        id: 'lesson-1-1',
        title_pl: 'Powitania',
        title_en: 'Greetings',
        icon: '👋',
        description_pl: 'Każde "cześć" to otwarte drzwi.',
        description_en: 'Every hello is a door opening.',
        xp: 10,
        exercises: [
          {
            id: 'ex-1-1-1',
            type: 'multiple_choice',
            prompt_en: 'How do you say "Cześć" in English?',
            prompt_pl: 'Jak powiedzieć "Cześć" po angielsku?',
            options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
            correctAnswer: 'Hello',
            hint_pl: 'To powitanie na początek rozmowy'
          },
          {
            id: 'ex-1-1-2',
            type: 'listen_and_select',
            prompt_en: 'Listen and select the correct greeting',
            prompt_pl: 'Posłuchaj i wybierz właściwe powitanie',
            audioText: 'Good morning',
            options: ['Good morning', 'Good night', 'Good evening', 'Good afternoon'],
            correctAnswer: 'Good morning',
            hint_pl: 'Poranek to czas przed południem'
          },
          {
            id: 'ex-1-1-3',
            type: 'type_answer',
            prompt_en: 'Translate: "Jak się masz?"',
            prompt_pl: 'Przetłumacz: "Jak się masz?"',
            correctAnswer: 'how are you',
            hint_pl: 'Pytanie o samopoczucie drugiej osoby'
          },
          {
            id: 'ex-1-1-4',
            type: 'multiple_choice',
            prompt_en: 'What is the correct response to "How are you?"',
            prompt_pl: 'Jaka jest właściwa odpowiedź na "How are you?"',
            options: ['I am fine', 'I am John', 'Yes please', 'Goodbye'],
            correctAnswer: 'I am fine',
            hint_pl: 'Odpowiedź na pytanie o samopoczucie'
          },
          {
            id: 'ex-1-1-5',
            type: 'listen_and_type',
            prompt_en: 'Listen and type what you hear',
            prompt_pl: 'Posłuchaj i wpisz co słyszysz',
            audioText: 'Nice to meet you',
            correctAnswer: 'nice to meet you',
            hint_pl: 'Zwrot używany przy pierwszym spotkaniu'
          },
          {
            id: 'ex-1-1-6',
            type: 'drag_words',
            prompt_en: 'Arrange the words to form a greeting',
            prompt_pl: 'Ułóż słowa w powitanie',
            words: ['Good', 'morning', 'How', 'are', 'you'],
            correctAnswer: 'Good morning How are you',
            hint_pl: 'Powitanie na początek dnia + pytanie o samopoczucie'
          },
          {
            id: 'ex-1-1-7',
            type: 'fill_blanks',
            prompt_en: 'Fill in the blanks to complete the conversation',
            prompt_pl: 'Uzupełnij luki aby dokończyć rozmowę',
            sentence: 'Hello! ___ are you? I am ___ thank you.',
            blanks: ['How', 'fine'],
            correctAnswer: 'How fine',
            hint_pl: 'Podstawowa rozmowa powitalna'
          }
        ]
      },
      {
        id: 'lesson-1-2',
        title_pl: 'Liczby 1-10',
        title_en: 'Numbers 1-10',
        icon: '🔢',
        description_pl: 'Liczby to rytm życia.',
        description_en: 'Numbers are life\'s rhythm.',
        xp: 10,
        exercises: [
          {
            id: 'ex-1-2-1',
            type: 'multiple_choice',
            prompt_en: 'How do you say "trzy" in English?',
            prompt_pl: 'Jak powiedzieć "trzy" po angielsku?',
            options: ['Two', 'Three', 'Four', 'Five'],
            correctAnswer: 'Three',
            hint_pl: 'To liczba między dwa a cztery'
          },
          {
            id: 'ex-1-2-2',
            type: 'listen_and_select',
            prompt_en: 'Listen and select the number you hear',
            prompt_pl: 'Posłuchaj i wybierz liczbę którą słyszysz',
            audioText: 'Seven',
            options: ['Six', 'Seven', 'Eight', 'Nine'],
            correctAnswer: 'Seven',
            hint_pl: 'Siedem dni w tygodniu'
          },
          {
            id: 'ex-1-2-3',
            type: 'type_answer',
            prompt_en: 'Write the number: pięć',
            prompt_pl: 'Napisz liczbę: pięć',
            correctAnswer: 'five',
            hint_pl: 'Liczba palców u jednej ręki'
          },
          {
            id: 'ex-1-2-4',
            type: 'multiple_choice',
            prompt_en: 'What number comes after "nine"?',
            prompt_pl: 'Jaka liczba następuje po "nine"?',
            options: ['Eight', 'Ten', 'Eleven', 'Seven'],
            correctAnswer: 'Ten',
            hint_pl: 'Ostatnia liczba w pierwszej dziesiątce'
          }
        ]
      },
      {
        id: 'lesson-1-3',
        title_pl: 'Kolory',
        title_en: 'Colors',
        icon: '🌈',
        description_pl: 'Kolory malują świat naszymi słowami.',
        description_en: 'Colors paint the world with our words.',
        xp: 10,
        exercises: [
          {
            id: 'ex-1-3-1',
            type: 'multiple_choice',
            prompt_en: 'What color is the sky?',
            prompt_pl: 'Jakiego koloru jest niebo?',
            options: ['Blue', 'Red', 'Green', 'Yellow'],
            correctAnswer: 'Blue',
            hint_pl: 'Kolor oceanu i nieba w słoneczny dzień'
          },
          {
            id: 'ex-1-3-2',
            type: 'listen_and_select',
            prompt_en: 'Listen and select the color',
            prompt_pl: 'Posłuchaj i wybierz kolor',
            audioText: 'Purple',
            options: ['Purple', 'Orange', 'Pink', 'Black'],
            correctAnswer: 'Purple',
            hint_pl: 'Kolor lawedy i fiołków'
          },
          {
            id: 'ex-1-3-3',
            type: 'type_answer',
            prompt_en: 'Translate: "czerwony"',
            prompt_pl: 'Przetłumacz: "czerwony"',
            correctAnswer: 'red',
            hint_pl: 'Kolor róż i miłości'
          }
        ]
      },
      {
        id: 'lesson-1-4',
        title_pl: 'Zwierzęta',
        title_en: 'Animals',
        icon: '🐾',
        description_pl: 'Każde zwierzę ma swoją pieśń.',
        description_en: 'Every animal has its own song.',
        xp: 10,
        exercises: [
          {
            id: 'ex-1-4-1',
            type: 'multiple_choice',
            prompt_en: 'What sound does a cat make?',
            prompt_pl: 'Jaki dźwięk wydaje kot?',
            options: ['Meow', 'Woof', 'Moo', 'Oink'],
            correctAnswer: 'Meow',
            hint_pl: 'Dźwięk, który koty wydają gdy chcą uwagi'
          },
          {
            id: 'ex-1-4-2',
            type: 'listen_and_select',
            prompt_en: 'Listen and select the animal',
            prompt_pl: 'Posłuchaj i wybierz zwierzę',
            audioText: 'Dog',
            options: ['Cat', 'Dog', 'Bird', 'Fish'],
            correctAnswer: 'Dog',
            hint_pl: 'Najlepszy przyjaciel człowieka'
          },
          {
            id: 'ex-1-4-3',
            type: 'type_answer',
            prompt_en: 'Translate: "ptak"',
            prompt_pl: 'Przetłumacz: "ptak"',
            correctAnswer: 'bird',
            hint_pl: 'Zwierzę, które może latać'
          }
        ]
      },
      {
        id: 'lesson-1-5',
        title_pl: 'Jedzenie',
        title_en: 'Food',
        icon: '🍎',
        description_pl: 'Smakami łączymy kultury i serca.',
        description_en: 'Through flavors we connect cultures and hearts.',
        xp: 10,
        exercises: [
          {
            id: 'ex-1-5-1',
            type: 'multiple_choice',
            prompt_en: 'Which is a fruit?',
            prompt_pl: 'Co jest owocem?',
            options: ['Apple', 'Bread', 'Cheese', 'Rice'],
            correctAnswer: 'Apple',
            hint_pl: 'Czerwony owoc, który rośnie na drzewie'
          },
          {
            id: 'ex-1-5-2',
            type: 'listen_and_select',
            prompt_en: 'Listen and select the food',
            prompt_pl: 'Posłuchaj i wybierz jedzenie',
            audioText: 'Bread',
            options: ['Bread', 'Water', 'Milk', 'Sugar'],
            correctAnswer: 'Bread',
            hint_pl: 'Podstawowe jedzenie robione z mąki'
          },
          {
            id: 'ex-1-5-3',
            type: 'type_answer',
            prompt_en: 'Translate: "woda"',
            prompt_pl: 'Przetłumacz: "woda"',
            correctAnswer: 'water',
            hint_pl: 'Przezroczysta ciecz, bez której nie możemy żyć'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    title_pl: 'Rodzina i Znajomi',
    title_en: 'Family and Friends',
    cefr: 'A1',
    description_pl: 'Serce to dom, w którym mieszkają wszyscy, których kochamy.',
    description_en: 'The heart is a home where all we love reside.',
    lessons: [
      {
        id: 'lesson-2-1',
        title_pl: 'Członkowie Rodziny',
        title_en: 'Family Members',
        icon: '👨‍👩‍👧‍👦',
        description_pl: 'Rodzina to pierwsze słowa serca.',
        description_en: 'Family are the first words of the heart.',
        xp: 15,
        exercises: [
          {
            id: 'ex-2-1-1',
            type: 'multiple_choice',
            prompt_en: 'How do you say "matka" in English?',
            prompt_pl: 'Jak powiedzieć "matka" po angielsku?',
            options: ['Father', 'Mother', 'Sister', 'Brother'],
            correctAnswer: 'Mother',
            hint_pl: 'Kobieta, która cię urodziła'
          },
          {
            id: 'ex-2-1-2',
            type: 'listen_and_select',
            prompt_en: 'Listen and select the family member',
            prompt_pl: 'Posłuchaj i wybierz członka rodziny',
            audioText: 'Sister',
            options: ['Brother', 'Sister', 'Mother', 'Father'],
            correctAnswer: 'Sister',
            hint_pl: 'Dziewczyna z tej samej rodziny'
          },
          {
            id: 'ex-2-1-3',
            type: 'type_answer',
            prompt_en: 'Translate: "mój brat"',
            prompt_pl: 'Przetłumacz: "mój brat"',
            correctAnswer: 'my brother',
            hint_pl: 'Chłopiec z twojej rodziny'
          },
          {
            id: 'ex-2-1-4',
            type: 'multiple_choice',
            prompt_en: 'Complete: "This is ___ father"',
            prompt_pl: 'Uzupełnij: "This is ___ father"',
            options: ['my', 'you', 'he', 'she'],
            correctAnswer: 'my',
            hint_pl: 'Zaimek dzierżawczy pierwszej osoby'
          },
          {
            id: 'ex-2-1-5',
            type: 'listen_and_type',
            prompt_en: 'Listen and type what you hear',
            prompt_pl: 'Posłuchaj i wpisz co słyszysz',
            audioText: 'I love my family',
            correctAnswer: 'i love my family',
            hint_pl: 'Wyrażenie uczuć do rodziny'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    title_pl: 'Życie codzienne',
    title_en: 'Daily Life',
    cefr: 'A1',
    description_pl: 'W codzienności kryje się piękno prostoty.',
    description_en: 'In daily life hides the beauty of simplicity.',
    lessons: [
      {
        id: 'lesson-3-1',
        title_pl: 'Czas',
        title_en: 'Time',
        icon: '🕐',
        description_pl: 'Każda chwila to skarb ukryty w czasie.',
        description_en: 'Every moment is a treasure hidden in time.',
        xp: 15,
        exercises: [
          {
            id: 'ex-3-1-1',
            type: 'multiple_choice',
            prompt_en: 'What time is it? (3:00 PM)',
            prompt_pl: 'Która jest godzina? (15:00)',
            options: ["Three o'clock", 'Three PM', 'Fifteen hundred', 'All correct'],
            correctAnswer: 'All correct',
            hint_pl: 'Wszystkie odpowiedzi oznaczają tę samą godzinę'
          },
          {
            id: 'ex-3-1-2',
            type: 'listen_and_select',
            prompt_en: 'Listen and select the correct time',
            prompt_pl: 'Posłuchaj i wybierz właściwą godzinę',
            audioText: 'half past two',
            options: ['2:30', '2:15', '2:45', '3:30'],
            correctAnswer: '2:30',
            hint_pl: 'Half past oznacza pół godziny po'
          },
          {
            id: 'ex-3-1-3',
            type: 'type_answer',
            prompt_en: 'How do you say "Która godzina?" in English?',
            prompt_pl: 'Jak powiedzieć "Która godzina?" po angielsku?',
            correctAnswer: 'what time is it',
            hint_pl: 'Pytanie o aktualną godzinę'
          },
          {
            id: 'ex-3-1-4',
            type: 'drag_words',
            prompt_en: 'Arrange: "I wake up at seven in the morning"',
            prompt_pl: 'Ułóż: "Budzę się o siódmej rano"',
            words: ['I', 'wake', 'up', 'at', 'seven', 'in', 'the', 'morning'],
            correctAnswer: 'I wake up at seven in the morning',
            hint_pl: 'Opis codziennej czynności rano'
          }
        ]
      },
      {
        id: 'lesson-3-2',
        title_pl: 'Codzienne czynności',
        title_en: 'Daily Activities',
        icon: '🏃',
        description_pl: 'W rutynie znajdziemy rytm życia.',
        description_en: 'In routine we find the rhythm of life.',
        xp: 15,
        exercises: [
          {
            id: 'ex-3-2-1',
            type: 'multiple_choice',
            prompt_en: 'What do you do first in the morning?',
            prompt_pl: 'Co robisz jako pierwsze rano?',
            options: ['Brush teeth', 'Have breakfast', 'Wake up', 'Take a shower'],
            correctAnswer: 'Wake up',
            hint_pl: 'Pierwsza czynność po śnie'
          },
          {
            id: 'ex-3-2-2',
            type: 'listen_and_type',
            prompt_en: 'Listen and type what you hear',
            prompt_pl: 'Posłuchaj i wpisz to, co słyszysz',
            audioText: 'I have breakfast at eight',
            correctAnswer: 'I have breakfast at eight',
            hint_pl: 'Opis porannego posiłku'
          },
          {
            id: 'ex-3-2-3',
            type: 'fill_blanks',
            prompt_en: 'Fill in: "I ___ my teeth every morning"',
            prompt_pl: 'Uzupełnij: "I ___ my teeth every morning"',
            sentence: 'I ___ my teeth every morning',
            blanks: ['brush'],
            correctAnswer: 'brush',
            hint_pl: 'Czynność higieniczna z zębami'
          },
          {
            id: 'ex-3-2-4',
            type: 'type_answer',
            prompt_en: 'Translate: "Idę do szkoły"',
            prompt_pl: 'Przetłumacz: "Idę do szkoły"',
            correctAnswer: 'I go to school',
            hint_pl: 'Codzienne przemieszczenie się do miejsca nauki'
          }
        ]
      },
      {
        id: 'lesson-3-3',
        title_pl: 'W domu',
        title_en: 'At Home',
        icon: '🏠',
        description_pl: 'Dom to miejsce, gdzie serce znajduje spokój.',
        description_en: 'Home is where the heart finds peace.',
        xp: 15,
        exercises: [
          {
            id: 'ex-3-3-1',
            type: 'multiple_choice',
            prompt_en: 'Where do you sleep?',
            prompt_pl: 'Gdzie śpisz?',
            options: ['Kitchen', 'Bedroom', 'Bathroom', 'Living room'],
            correctAnswer: 'Bedroom',
            hint_pl: 'Pokój przeznaczony do spania'
          },
          {
            id: 'ex-3-3-2',
            type: 'image_match',
            prompt_en: 'Match the room with its function',
            prompt_pl: 'Dopasuj pokój do jego funkcji',
            pairs: [
              { en: 'Kitchen', pl: 'Kuchnia' },
              { en: 'Bathroom', pl: 'Łazienka' },
              { en: 'Living room', pl: 'Salon' }
            ],
            correctAnswer: ['Kitchen', 'Bathroom', 'Living room'],
            hint_pl: 'Każdy pokój ma swoją główną funkcję'
          },
          {
            id: 'ex-3-3-3',
            type: 'type_answer',
            prompt_en: 'Translate: "Jestem w kuchni"',
            prompt_pl: 'Przetłumacz: "Jestem w kuchni"',
            correctAnswer: 'I am in the kitchen',
            hint_pl: 'Określenie miejsca pobytu w domu'
          }
        ]
      }
    ]
  }
];
