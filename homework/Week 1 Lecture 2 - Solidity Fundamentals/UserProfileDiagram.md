# UserProfile Contract Diagram

This updated diagram illustrates the improved `UserProfile` smart contract, now including input validation and event emission for registration and profile updates.

```mermaid
flowchart TD
    A["User (EOA)"] -- "register()" --> B["UserProfile Contract"]
    B -- "validates input" --> V1["Name/email not empty? Age ≤ 150? Not registered?"]
    V1 -- "if valid" --> S1["Store in users mapping"]
    S1 -- "emit" --> E1["UserRegistered Event"]
    V1 -- "if invalid" --> X1["Revert"]

    A -- "updateProfile()" --> B
    B -- "validates input" --> V2["Name/email not empty? Age ≤ 150? Registered?"]
    V2 -- "if valid" --> S2["Update users mapping"]
    S2 -- "emit" --> E2["ProfileUpdated Event"]
    V2 -- "if invalid" --> X2["Revert"]

    A -- "getProfile()" --> B
    B -- "check registered?" --> V3["Registered?"]
    V3 -- "if valid" --> R1["Return Profile Data"]
    V3 -- "if invalid" --> X3["Revert"]

    S1 -- "contains" --> U["User struct\n- name\n- email\n- age\n- registrationTimestamp"]
```

**Shown:**

- Input validation for registration and update (empty fields, age limit, registration status)
- Event emission (`UserRegistered`, `ProfileUpdated`) on successful actions
- Revert paths for invalid input or unauthorized actions
