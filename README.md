# Statistics Trainer

Mean, median, mode, range, standard deviation, quartiles and the normal curve, with generated data.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Statistics Trainer.exe` from the [latest release](https://github.com/Apurba94/gre-statistics/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-statistics/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Data analysis is a quarter of GRE Quant. Practise mean, median, range, standard deviation and comparisons with generated data, and use the calculator to describe any list of numbers, including quartiles and the population standard deviation the GRE uses.

Sections: Practice, Calculator, Progress, About.

## How to use it

1. Practise in **Practice**.
2. Type a list in **Calculator** to check your work or explore how one value changes the mean but not the median.
3. Remember: adding the same number to every value does not change the standard deviation.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (24 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
