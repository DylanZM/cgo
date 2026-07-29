export interface Template {
  name: string
  description: string
  code: string
}

export const templates: Template[] = [
  {
    name: 'Hello World',
    description: 'Minimal starting point',
    code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  },
  {
    name: 'Fibonacci',
    description: 'Recursive sequence',
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
    name: 'Bubble Sort',
    description: 'Arrays & algorithm',
    code: `#include <iostream>

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int numbers[] = {5, 3, 8, 1, 9, 2};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    std::cout << "Original: ";
    printArray(numbers, size);

    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                int temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
            }
        }
    }

    std::cout << "Sorted:   ";
    printArray(numbers, size);

    return 0;
}`,
  },
]
