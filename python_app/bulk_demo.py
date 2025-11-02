import json
from english_classes import create_multiple_classes

# Suppose you have a JSON file that looks like:
# [
#   {"name":"A1 Listening", "level":"Beginner", "teacher":"Sara", ...},
#   {"name":"B2 Academic Writing", "level":"Upper‑Intermediate", "teacher":"Tom", ...}
# ]

# Create a dummy json for the demo to run
specs_data = [
  {"name":"A1 Listening", "level":"Beginner", "teacher":"Sara", "days": "Mon", "start_time": "10:00", "end_time": "11:00", "capacity": 10},
  {"name":"B2 Academic Writing", "level":"Upper‑Intermediate", "teacher":"Tom", "days": "Tue, Thu", "start_time": "14:00", "end_time": "15:30", "capacity": 8}
]
with open("class_specs.json", "w", encoding="utf-8") as f:
    json.dump(specs_data, f)


with open("class_specs.json", "r", encoding="utf-8") as f:
    specs = json.load(f)

all_classes = create_multiple_classes(specs)

print("--- Bulk Creating Classes ---")
for cls in all_classes:
    print(cls)
print("-----------------------------")
