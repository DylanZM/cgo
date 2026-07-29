export interface Template {
  name: string
  description: string
  language: 'c' | 'c++'
  code: string
}

export const templates: Template[] = [
  {
    name: 'Hello World',
    description: 'Minimal starting point',
    language: 'c++',
    code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  },
  {
    name: 'Hello World (C)',
    description: 'Minimal C starting point',
    language: 'c',
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },
  {
    name: 'Fibonacci',
    description: 'Recursive sequence',
    language: 'c++',
    code: `#include <iostream>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    for (int i = 0; i < 10; i++) {
        std::cout << fibonacci(i) << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
  },
  {
    name: 'Structs',
    description: 'Custom types & methods',
    language: 'c++',
    code: `#include <iostream>
#include <string>

struct Person {
    std::string name;
    int age;
};

void printPerson(const Person& p) {
    std::cout << p.name << " (" << p.age << " years old)" << std::endl;
}

int main() {
    Person alice = {"Alice", 30};
    Person bob = {"Bob", 25};

    printPerson(alice);
    printPerson(bob);

    return 0;
}`,
  },
  {
    name: 'Pointers',
    description: 'References and memory',
    language: 'c++',
    code: `#include <iostream>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    std::cout << "Before: x=" << x << " y=" << y << std::endl;

    swap(&x, &y);

    std::cout << "After:  x=" << x << " y=" << y << std::endl;
    return 0;
}`,
  },
  {
    name: 'Arrays (C)',
    description: 'Bubble sort example',
    language: 'c',
    code: `#include <stdio.h>

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int numbers[] = {5, 3, 8, 1, 9, 2};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original: ");
    printArray(numbers, size);

    // Bubble sort
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                int temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
            }
        }
    }

    printf("Sorted:   ");
    printArray(numbers, size);

    return 0;
}`,
  },
]
