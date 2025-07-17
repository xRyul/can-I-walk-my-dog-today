# Development Principles

This steering file outlines core development principles to be followed across the project.

## Fundamental Principles

- **KISS (Keep It Simple, Stupid)**: Always favor the simplest solution that meets the requirements. Complexity should only be added when absolutely necessary.

- **DRY (Don't Repeat Yourself)**: Avoid code duplication. Extract reusable logic into functions, classes, or modules.

- **YAGNI (You Ain't Gonna Need It)**: Don't implement features or functionality unless they are currently required. Avoid speculative generality.

- **SOLID Principles**:
  - Single Responsibility: A class should have only one reason to change
  - Open/Closed: Open for extension, closed for modification
  - Liskov Substitution: Subtypes must be substitutable for their base types
  - Interface Segregation: Many specific interfaces are better than one general interface
  - Dependency Inversion: Depend on abstractions, not concretions

## Development Approach

- **Iterative Development**: Build the system in small, incremental steps. Validate each step before moving to the next.

- **Standard Libraries and Tools**: Utilize standard libraries and well-maintained packages to avoid reinventing the wheel. Favor well-maintained and widely-used libraries.

- **Self-Documenting Code**: Write code that clearly expresses its intent. Choose descriptive names and logical structure.

## Documentation Guidelines

- **Clear Reasoning**: Add a comment block at the top of each significant code section explaining:
  - What problem this solves
  - Why this approach was chosen
  - What alternatives were considered

- **Algorithm Documentation**: Explain complex algorithms step-by-step in comments.

- **Tell the Story**: Make the code's evolution story clear through structure and documentation. Documentation is as important as functionality.

- **Context**: Provide context for why certain patterns or libraries were chosen.

- **Anticipate Questions**: Answer likely questions in comments.

- **Educational Approach**: Write code as if explaining to someone learning the technology.

## Naming Conventions

- **Filenames**: Use explicit and self-explanatory filenames that reflect their contents. Follow framework conventions where applicable.
  - Examples: `button_submit.py` for a button component; `pydantic_models.py` for files dealing with Pydantic.

- **Variables and Classes**: Names should be clear, descriptive, and explicit to convey their purpose without ambiguity.

## Commenting Style

- Use `#` for brief inline comments in Python.
- Use `//` for brief inline comments in JavaScript/TypeScript.
- Use triple quotes `"""` or JSDoc `/**` only for multi-line docstrings.
- Comments should explain "why" not "what" (the code should show what it does).