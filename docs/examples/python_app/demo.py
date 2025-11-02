from english_classes import create_english_class

my_class = create_english_class(
    name="Pre‑Intermediate Speaking",
    level="Pre‑Intermediate",
    teacher="Michael",
    days=["Monday", "Wednesday"],
    start_time="11:00",
    end_time="12:15",
    capacity=10,
    auto_generate_syllabus=True,
)

print(my_class)          # Human‑readable summary
print(my_class.syllabus) # Auto‑generated topic list

# Enrol a student
if my_class.add_student("Emily"):
    print("Emily enrolled")
else:
    print("Class is full!")
