import { Unit } from '../types';

export const skillTree: Unit[] = [
  {
    id: 'unit-1',
    title_pl: 'Podstawy',
    title_en: 'Basics',
    cefr: 'A0',
    lessons: [
      {
        id: 'lesson-1-1',
        title_pl: 'Powitania',
        title_en: 'Greetings',
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
      }
    ]
  },
  {
    id: 'unit-2',
    title_pl: 'Rodzina i Znajomi',
    title_en: 'Family and Friends',
    cefr: 'A1',
    lessons: [
      {
        id: 'lesson-2-1',
        title_pl: 'Członkowie Rodziny',
        title_en: 'Family Members',
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
  }
];
