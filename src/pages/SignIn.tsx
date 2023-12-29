import React, { useState } from "react";
import styles from "../styles/SignIn.module.css";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push("/");
        showSuccessToast(data.message)
      } else {
        showErrorToast(data.message);
        router.push("/SignIn");
      }
    } catch (error: any) {
      console.log(error, 'Error During Sign In')
    }
  };

  return (
    <Layout title="Fav Movies">
      <div className={styles.container}>
        <div className={styles.signInBox}>
          <h1 className={styles.signInText}>Sign In</h1>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}></div>
            <div className={styles.inputField}>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}></div>
            <div className={styles.inputField}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
          </div>
          <button className={styles.signInButton} onClick={handleSignIn}>
            Sign In
          </button>
          <p className={styles.signUpLink}>
            Do not have an account?{" "}
            <Link href="/SignUp" passHref>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
