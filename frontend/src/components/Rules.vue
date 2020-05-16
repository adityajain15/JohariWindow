<template>
  <div>
    <div class="rulesWrapper w-80 center lh-copy">
      <h1 class="teko"></h1>
      <p>
        The Johari window is a technique that helps people better understand
        their relationship with themselves and others. The technique unfolds in
        the following way:
        <ol class="pv3">
          <li>
            A single person is chosen as the subject from a particular group
          </li>
          <li>
            The subject picks a certain number of adjectives from a given list,
            choosing the ones that they feel describe themselves
          </li>
          <li>
            The subject's peers then get the same list, and each peer also picks a
            certain number of adjectives that describe the subject
          </li>
          <img src="@/assets/jw_example.jpeg" class="w-50 db center">
          <li>
            These adjectives are then inserted into one of four quadrants. These quadrants are described as:
            <h2 class="teko f3 lh-headline">Arena</h2>
            <p>
              Adjectives that both the subject and peers select go in this cell 
              (or quadrant) of the grid. These are traits that subject and
              peers perceive.
            </p>
            <h2 class="teko lh-headline f3">Blindspot</h2>
            <p>
              Adjectives not selected by subjects, but only by their peers go here. These represent what others perceive but the subject does not.
            </p>
            <h2 class="teko lh-headline f3">Facade</h2>
            <p>
              Adjectives selected by the subject, but not by any of their peers, go in this quadrant. These are things the peers are either unaware of, or that are untrue but for the subject's claim.
            </p>
            <h2 class="teko lh-headline f3">Unknowns</h2>
            <p>
              Adjectives that neither subject nor peers selected go here. They represent subject's behaviors or motives that no one participating recognizes—either because they do not apply or because of collective ignorance of these traits.
            </p>
          </li>
          <li>
            Once the adjectives are placed on the four possible quadrants, the subject and the peers are encouraged to engage in a dialogue.
            <ul>
              <li>
                For the subject, the goal is to expand the boundaries of self-awareness by critically examining the parts of their personality they may feel they have but do not necessarily express, as well as the parts of their personality that are seen by others but not necessarily seen by themselves.
              </li>
              <li>
                Peers are encouraged to respond to the subject's questions and to also ask questions of their own, critically examining their own choices and as well as that of the subject. 
              </li>
            </ul>
          </li>
        </ol>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rules'
}
</script>

<style scoped>
ol {
  list-style-type: decimal;
}

ul {
  list-style-type: disc;
}
</style>
