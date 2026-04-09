"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/shared/lib/motion";
import { staticImportUrl } from "@/shared/lib/static-import-url";
import { useResolvedTheme } from "@/shared/lib/theme/use-resolved-theme";

import darkBtn from "@/shared/assets/ico/darkBtn.svg";
import lightBtn from "@/shared/assets/ico/lightBtn.svg";

export function HeroSection() {
  const { isDark, isReady } = useResolvedTheme();
  const buttonAsset = isDark ? darkBtn : lightBtn;
  const bgRoundUrl = isDark ? "/darkBgRound.png" : "/lightBgRound.png";
  const bgRoundMobUrl = isDark ? "/darkBgRoundMob.png" : "/lightBgRoundMob.png";
  const buttonBgUrl = staticImportUrl(buttonAsset);

  if (!isReady) {
    return null;
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 text-foreground">
      {/* md 이하: 모바일용 배경 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-no-repeat bg-center md:hidden"
        style={{
          backgroundImage: `url(${bgRoundMobUrl})`,
          backgroundSize: "60% auto",
        }}
        aria-hidden
      />
      {/* md 이상: 데스크탑용 배경 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-no-repeat bg-center md:block"
        style={{
          backgroundImage: `url(${bgRoundUrl})`,
          backgroundSize: "60% auto",
        }}
        aria-hidden
      />
      
      <motion.div
        className="mx-auto flex w-full max-w-4xl mt-20 flex-col items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={staggerItem}
          className="mx-auto mb-4 w-fit"
        >
          <h1 className="mx-auto max-w-[80%] text-center font-a2z text-4xl font-bold leading-[110%] [text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] sm:text-7xl md:text-8xl lg:text-8xl dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]">
            FRONTEND DEVELOPER
          </h1>
        </motion.div>
        <motion.div variants={staggerItem} className="mb-8 inline-block">
          <p className="text-lg text-primary after:content-['▍'] after:ml-[0.15em] after:opacity-85 after:animate-[cursor-blink_1.1s_step-end_infinite]">
            Making complex UI simple and clear
          </p>
        </motion.div>
        <motion.a
          href="#projects"
          className="mb-10 font-bold px-4 py-6 text-[14px] text-foreground"
          variants={staggerItem} 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={
            isReady
              ? {
                  backgroundImage: `url(${buttonBgUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                }
              : undefined
          }
        >
          View Projects
        </motion.a>
      </motion.div>
    </section>
  );
}
