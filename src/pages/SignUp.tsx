import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/SignUp.module.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { showErrorToast, showSuccessToast } from "@/utils/toastMessage";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.isSignedUp) {
      router.push("/SignIn");
      showSuccessToast(data.message)
    } else {
      router.push("/SignUp");
      showErrorToast(data.message)
    }
  };

  return (
    <Layout title="Fav Movies">
      <div className={styles.container}>
        <div className={styles.signUpBox}>
          <h1 className={styles.signUpText}>Sign Up</h1>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
            </div>
            <div className={styles.inputField}>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.labelWrapper}>
            </div>
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
            <div className={styles.labelWrapper}>
            </div>
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
          <button className={styles.signUpButton} onClick={handleSignUp}>
            Sign Up
          </button>
          <p className={styles.signInLink}>
            Already have an account?{" "}
            <Link href="/SignIn" passHref>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
