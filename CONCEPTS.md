
# iNotebook Development Concepts & Concepts

This document outlines the key technologies and programming concepts used in the development of **iNotebook**. It serves as a reference guide for understanding the codebase.

## 1. Frontend Concepts (React.js)

### 1.1 Functional Components
The project uses **Functional Components** exclusively, which are JavaScript functions that return JSX.
- **Why**: Simpler syntax, better performance, and compatibility with Hooks.
- **Example**: `Navbar.js`, `Home.js`, `About.js`.

### 1.2 React Hooks
Hooks allow functional components to use state and other React features.

#### `useState`
- **Purpose**: To declare state variables in functional components.
- **Usage**: Used for managing alerts, notes, and form inputs.
```javascript
const [notes, setnotes] = useState([]);
```

#### `useEffect`
- **Purpose**: To perform side effects in functional components, such as fetching data, directly updating the DOM, and timers.
- **Usage**: In `Notes.js`, it is used to fetch all notes when the component mounts. It also checks if a user token exists; if not, it redirects to login.
```javascript
// src/components/Notes.js
useEffect(() => {
  if(!localStorage.getItem('token')){
    navigate('/login')
  }
  getnotes();
  // eslint-disable-next-line
}, []); // Empty dependency array [] means this runs once on mount
```

#### `useRef`
- **Purpose**: To persist values between renders without causing a re-render, or to access DOM elements directly.
- **Usage**: In `Notes.js`, it is used to programmatically trigger a specific button click to open or close the "Edit Note" modal.
```javascript
// src/components/Notes.js
const ref = useRef(null);
// ...
// Triggering the hidden modal launch button
ref.current.click();
```

#### `useContext`
- **Purpose**: To subscribe to React context without wrapping components in consumers.
- **Usage**: Accessing `NoteContext` in components like `Home` or `Notes`.
```javascript
const context = useContext(NoteContext);
const { notes, getnotes } = context;
```

### 1.3 Context API (Detailed)
The Context API is designed to share data that can be considered "global" for a tree of React components.

- **The Problem**: Traditionally, data is passed top-down (parent to child) via props. This becomes cumbersome ("prop drilling") if many components at different levels need the same data (e.g., user auth state, theme, or notes data).
- **The Solution**: Context allows you to "broadcast" data, and any component in the subtree can "tune in" to it.

**Components in iNotebook:**
1.  **Context Object (`noteContext.js`)**: created using `createContext()`.
2.  **Provider (`NoteState.js`)**: This component wraps the part of the app that needs access to the state. It accepts a `value` prop which holds the data/functions we want to share.
    ```javascript
    // src/context/notes/NoteState.js
    <NoteContext.Provider value={{ notes, editNote, addNote, deleteNote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
    ```
3.  **Consumer (`useContext` hook)**: Any child component (e.g., `Notes.js`) can access the value provided by `NoteState` using `useContext(NoteContext)`.

### 1.4 Navigation (`useNavigate`)
- **Library**: `react-router-dom` (Version 6)
- **Hook**: `useNavigate`
- **Purpose**: Validating specific conditions and programmatically navigating the user to different routes (e.g., redirecting to home after login or to login if not authenticated).
- **Usage**:
    ```javascript
    // src/components/Login.js
    import { useNavigate } from "react-router-dom";
    // ...
    let navigate = useNavigate();
    // ...
    if(json.status){
        // Redirect to home page on success
        navigate('/');
    }
    ```

### 1.5 React Router v6 Setup
- **Purpose**: Enables navigation among views without a full page reload.
- **Components**: `BrowserRouter`, `Routes`, `Route`.
- **Usage**: `App.js` defines the routing structure.
```javascript
<Routes>
  <Route path="/" element={<Home showAlert={showAlert}/>} />
  <Route path="/login" element={<Login showAlert={showAlert} />} />
</Routes>
```

---

## 2. Backend Concepts (Node.js & Express)

### 2.1 REST API Structure
The backend is structured as a REST API, providing endpoints that perform CRUD operations.
- **Routes**: Located in `Backend/routes/`.
- **Endpoints**:
    - `POST /api/auth/createuser`: Register a new user.
    - `POST /api/auth/login`: Authenticate a user.
    - `GET /api/notes/fetchallnotes`: Get all notes for the logged-in user.

### 2.2 Express Middleware
- **Purpose**: Functions that execute during the request-response cycle.
- **Example**: `express.json()` parses incoming JSON payloads.
- **Custom Middleware**: `fetchuser.js` (implied concept) is used to verify the JWT token and extract the user ID before allowing access to protected routes.

### 2.3 Authentication (JWT & Bcrypt)
- **Encryption**: Passwords are **hashed** using `bcryptjs` before storage. We never store plain text passwords.
```javascript
let pass = bcrypt.hashSync(password, 10);
```
- **Token Generation**: `jsonwebtoken` (JWT) is used to generate a signed token upon successful login.
```javascript
const token = jwt.sign(data, process.env.JWT_SECRET);
```
- **Verification**: Protected routes require this token in the header (`auth-token`) to authenticate requests.

---

## 3. Database (MongoDB & Mongoose)

### 3.1 Mongoose Schemas
- **Purpose**: Defines the structure of the documents stored in MongoDB.
- **Usage**: Models like `User.js` and `Notes.js` (implied).
- **Example**:
```javascript
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // ...
});
```

### 3.2 Database Connection
- **File**: `Backend/db.js`
- **Logic**: Connects to the MongoDB instance using `mongoose.connect()`.

---

## 4. Full Stack Integration

### 4.1 CORS (Cross-Origin Resource Sharing)
- **Problem**: Browsers block requests from the frontend (port 3000) to the backend (port 5000) by default.
- **Solution**: The `cors` middleware is used in `Backend/index.js` to allow these cross-origin requests.
```javascript
app.use(cors());
```

### 4.2 Concurrent Execution
- **Tool**: `concurrently` package.
- **Purpose**: Allows running both the backend server (nodemon) and the frontend dev server (react-scripts) with a single command: `npm run both`.
