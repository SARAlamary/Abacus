import random

def generate_random_positive():
    """Generate a random positive number within the specified range, excluding 0."""
    return random.randint(1, 9)

def generate_random_negative():
    """Generate a random negative number within the specified range (-1 to -5)."""
    return random.randint(-5, -1)


def generate_numbers_for_question():
    """Generate 5 numbers where the sum is between 0 and 9, with negative numbers appearing after at least one positive number."""
    while True:
        numbers = []
        num_positive = random.randint(3,3)  # At least 3 or 4 positive numbers
        num_negative = 4 - num_positive  # The rest will be negative numbers
        
        # Generate the positive numbers
        for _ in range(num_positive):
            numbers.append(generate_random_positive())
        
        # Place the negative numbers randomly but after at least one positive number
        for _ in range(num_negative):
            insert_index = random.randint(1, len(numbers))  # Ensure the negative number is not the first element
            numbers.insert(insert_index, generate_random_negative())
        
        correct_answer = sum(numbers)
        
        if 0 <= correct_answer <= 9:
            return numbers, correct_answer

def generate_options_for_5_numbers(correct_answer):
    """Generate 3 random options for the answer, ensuring one is the correct answer."""
    options = {correct_answer}  # Start with the correct answer in the set
    while len(options) < 3:
        num = random.randint(0, 9)
        if num != correct_answer:
            options.add(num)
    options_list = list(options)
    random.shuffle(options_list)
    return options_list

def generate_quiz_question():
    numbers, correct_answer = generate_numbers_for_question()
    options = generate_options_for_5_numbers(correct_answer)

    question = '<p>' + '</p><p>'.join(map(str, numbers)) + '</p>'
    options_str = ','.join(map(str, options))
    answer = str(correct_answer)

    quiz_question = {
        'question': question,
        'options': options_str,
        'answer': answer
    }

    return quiz_question

def generate_all_questions(num_questions):
    for i in range(1, num_questions + 1):
        question = generate_quiz_question()
        print(f"{{\"question\": \"{question['question']}\",\"options\": [{question['options']}],\"answer\": \"{question['answer']}\"}},")
        
# Generate the questions
num_questions = 20
generate_all_questions(num_questions)
